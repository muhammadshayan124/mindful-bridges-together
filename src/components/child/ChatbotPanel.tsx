import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE } from "@/lib/api";

interface ChatbotPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const ChatbotPanel = ({ isOpen, onToggle }: ChatbotPanelProps) => {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Hi there! 👋 I'm your MindfulBuddy! How are you feeling today?",
    }
  ]);
  const messagesRef = useRef(messages);

  // Log API base URL
  useEffect(() => {
    console.log("[MB] API_BASE:", API_BASE);
  }, []);

  // Update ref when messages change
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Save conversation to Supabase
  const saveConversationToSupabase = async () => {
    if (!user?.id || messagesRef.current.length <= 1) return;

    try {
      // Save all messages except the initial greeting
      const messagesToSave = messagesRef.current.slice(1).map(msg => ({
        child_id: user.id,
        message: msg.content,
        is_user: msg.role === "user",
      }));

      if (messagesToSave.length > 0) {
        const { error } = await supabase
          .from('chat_messages')
          .insert(messagesToSave);

        if (error) {
          console.error('Error saving conversation:', error);
        } else {
          console.log('Conversation saved successfully');
        }
      }
    } catch (error) {
      console.error('Error saving conversation to Supabase:', error);
    }
  };

  // Save conversation when chat closes
  const handleToggle = () => {
    saveConversationToSupabase();
    onToggle();
  };

  // Save conversation on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveConversationToSupabase();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also save when component unmounts
      saveConversationToSupabase();
    };
  }, []);

  // Save individual messages immediately after they're sent/received
  const saveMessageToSupabase = async (messageText: string, isUser: boolean) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          child_id: user.id,
          message: messageText,
          is_user: isUser,
        });

      if (error) {
        console.error('Error saving message:', error);
      }
    } catch (error) {
      console.error('Error saving message to Supabase:', error);
    }
  };

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    if (!API_BASE) {
      setMessages(m => [...m, { id: crypto.randomUUID(), role: "assistant", content: "Setup issue: API not configured." }]);
      return;
    }
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages(m => [...m, userMsg]);
    setInput(""); 
    setLoading(true);
    
    // Save user message immediately
    await saveMessageToSupabase(text, true);
    
    const ctrl = new AbortController(); 
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, session_id: user?.id }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text().catch(()=> "")}`);
      const data = await res.json();
      const reply = (data?.reply ?? "").toString().trim() || "I'm having trouble replying right now.";
      const assistantMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: reply };
      setMessages(m => [...m, assistantMsg]);
      
      // Save bot response immediately
      await saveMessageToSupabase(reply, false);
    } catch (e) {
      console.error("[MB] send() error:", e);
      const errorMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: "I couldn't reach our helper. Try again?" };
      setMessages(m => [...m, errorMsg]);
    } finally { 
      setLoading(false); 
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-child-primary to-child-secondary shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 bg-white/95 dark:bg-child-surface/95 backdrop-blur-sm border-2 border-child-primary/20 rounded-3xl shadow-2xl z-50 animate-in slide-in-from-bottom-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-quicksand text-child-primary flex items-center gap-2">
            🤖 MindfulBuddy
            <div className="w-2 h-2 bg-child-accent rounded-full animate-pulse" />
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="h-8 w-8 rounded-full hover:bg-child-primary/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full pb-4">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-48">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  msg.role === 'assistant'
                    ? 'bg-gradient-to-r from-child-primary/20 to-child-secondary/20 text-child-primary border border-child-primary/20'
                    : 'bg-child-accent text-white'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="rounded-full bg-child-background border-child-primary/20 focus:border-child-primary"
            onKeyPress={(e) => e.key === 'Enter' && send()}
          />
          <Button
            onClick={send}
            size="icon"
            disabled={loading}
            className="rounded-full bg-child-primary hover:bg-child-primary/90 text-white disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotPanel;