// src/components/child/ChildChat.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthToken } from "@/hooks/useAuthToken"; // must return { token }
import { useChild } from "@/contexts/ChildContext";  // must return { childId }
import { smartSendChat, clearChatDiscoveryCache } from "@/lib/chatTransport";
import { API_BASE } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Heart, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RiskBadge from "@/components/ui/RiskBadge";
import SafetyPanel from "@/components/SafetyPanel";

type Turn = { role: 'user'|'assistant'; content: string };

interface Message {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
  triage?: 'none'|'low'|'medium'|'high';
}

const TypingIndicator = () => {
  return (
    <div className="flex gap-4 justify-start mb-6 animate-fade-in-up">
      <div className="w-12 h-12 bg-gradient-to-br from-mindful-accent to-mindful-send-button rounded-full flex items-center justify-center shadow-lg animate-gentle-pulse">
        <Bot className="w-6 h-6 text-white" />
      </div>
      <div className="bot-bubble px-6 py-4 rounded-3xl rounded-bl-lg max-w-xs shadow-lg">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-current rounded-full typing-dot opacity-60"></div>
          <div className="w-2 h-2 bg-current rounded-full typing-dot opacity-60"></div>
          <div className="w-2 h-2 bg-current rounded-full typing-dot opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default function ChildChat() {
  const { token } = useAuthToken();
  const { childId } = useChild();
  const { toast } = useToast();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTriage, setCurrentTriage] = useState<'none'|'low'|'medium'|'high'>('none');
  const [safetyLock, setSafetyLock] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !!childId && !!token && !safetyLock, [input, childId, token, safetyLock]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function onSend() {
    if (!canSend || sending) return;
    setError(null);
    const userTurn: Turn = { role: 'user', content: input.trim() };
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      message: input.trim(),
      timestamp: "Just now"
    };
    
    setTurns(prev => [...prev, userTurn]);
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setSending(true);
    
    try {
      const { replyText, raw } = await smartSendChat(
        token!, childId!, [...turns, userTurn], API_BASE
      );
      
      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        message: replyText,
        timestamp: "Just now",
        triage: raw.triage
      };
      
      setTurns(prev => [...prev, { role: 'assistant', content: replyText }]);
      setMessages(prev => [...prev, botMessage]);

      // Update triage status
      if (raw.triage) {
        setCurrentTriage(raw.triage);
        if (raw.triage === 'high') {
          setSafetyLock(true);
        }
      }
      
    } catch (e: any) {
      let errorMessage = e.message || String(e);
      
      // Add user-friendly error messages for common failures
      if (errorMessage.includes('401') || errorMessage.includes('403')) {
        errorMessage = "Your session may have expired. Please log in again.";
      } else if (errorMessage.includes('TypeError: Failed to fetch') || errorMessage.includes('CORS')) {
        errorMessage = "The server blocked the request (CORS). Add your Lovable origin to the backend CORS allowlist.";
      } else if (errorMessage.includes('404')) {
        errorMessage = "Endpoint not found. We tried /api/chat and /chat. Verify the server routes.";
      } else if (errorMessage.includes('400')) {
        errorMessage = "Server rejected the payload. The app will try alternate payload shapes.";
      }
      
      setError(errorMessage);
      
      const botErrorMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        message: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, botErrorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Couldn't send your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-quicksand">
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
        
        {/* Diagnostics banner */}
        {(!childId || !token || error) && (
          <div className="p-3 mb-2 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
            {!token && <>Missing auth token. Please sign in again.</>}
            {!childId && <>No child is linked. Enter a link code first.</>}
            {error && <><b>Chat error:</b> {error}</>}
          </div>
        )}

        {/* Connection Status card (small, collapsible) */}
        <details className="mb-2 text-sm border-b bg-gray-50 dark:bg-gray-800">
          <summary className="cursor-pointer p-3">Connection Status</summary>
          <div className="p-3 bg-gray-50 dark:bg-gray-700">
            <div className="mb-2">API Base: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs">{API_BASE}</code></div>
            <div className="mb-2">Child ID: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs">{childId ?? '(none)'}</code></div>
            <button
              className="mt-2 px-3 py-1 rounded bg-gray-800 text-white text-xs hover:bg-gray-900"
              onClick={() => { clearChatDiscoveryCache(); toast({ title: "Cache cleared", description: "Endpoint cache cleared" }); }}
            >
              Clear endpoint cache
            </button>
          </div>
        </details>

        {/* Chat Header */}
        <div className="p-4 border-b bg-gradient-to-r from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-mindful-accent" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Mindful Buddy</h2>
          </div>
          <div className="flex items-center gap-2">
            <RiskBadge level={currentTriage} />
            {safetyLock && (
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                <ShieldAlert className="w-3 h-3" />
                Safety mode
              </div>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[600px] overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white/30 to-transparent dark:from-gray-800/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
            >
              {msg.type === "bot" && (
                <div className="w-12 h-12 bg-gradient-to-br from-mindful-accent to-mindful-send-button rounded-full flex items-center justify-center shadow-lg flex-shrink-0 animate-gentle-pulse">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className="flex flex-col max-w-sm lg:max-w-md">
                <div
                  className={`px-6 py-4 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                    msg.type === "user"
                      ? "user-bubble rounded-br-lg"
                      : "bot-bubble rounded-bl-lg"
                  }`}
                >
                  <p className="text-sm leading-relaxed font-medium">{msg.message}</p>
                </div>
                <span className={`text-xs mt-2 font-medium opacity-60 ${
                  msg.type === "user" ? "text-right" : "text-left"
                }`}>
                  {msg.timestamp}
                </span>
              </div>
              
              {msg.type === "user" && (
                <div className="w-12 h-12 bg-gradient-to-br from-mindful-mint to-emerald-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {sending && <TypingIndicator />}
          {safetyLock && <SafetyPanel childId={childId || ''} />}
          <div ref={bottomRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-8 border-t bg-gradient-to-r from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm">
          <div className="flex gap-4 items-end">
            <div className="flex-1 relative">
              <Input
                placeholder={safetyLock ? "Chat is paused for your safety" : "Share what's on your mind... 💭"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="mindful-input-child child-focus text-base font-medium placeholder:text-gray-400 pr-12"
                disabled={sending || safetyLock}
              />
              {input && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Heart className="w-5 h-5 text-pink-400 animate-gentle-pulse" />
                </div>
              )}
            </div>
            <Button
              onClick={onSend}
              disabled={!canSend || sending}
              className="mindful-button-child w-16 h-16 p-0 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Send className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}