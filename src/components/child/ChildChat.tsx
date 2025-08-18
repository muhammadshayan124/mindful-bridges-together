
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Heart, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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

const ChildChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const saveMessageToSupabase = async (messageText: string, isUser: boolean) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          child_id: "USER_ID",  // replace with the actual user ID
          message: messageText,
          is_user: isUser,
        });

      if (error) {
        console.error('Error saving message to Supabase:', error);
      }
    } catch (error) {
      console.error('Error saving message to Supabase:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: newMessage,
      timestamp: "Just now"
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");  // Clear input field
    setIsTyping(true);

    // Send data to the API
    const payload = { text: userMessage.message };

    try {
      const response = await fetch("https://mindfullbuddy-production.up.railway.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        message: data?.reply,
        timestamp: "Just now"
      };

      setMessages(prev => [...prev, botMessage]);

      // Save both user and bot messages to Supabase
      await saveMessageToSupabase(userMessage.message, true);
      await saveMessageToSupabase(botMessage.message, false);
    } catch (error) {
      console.error("Error sending data:", error);
      const botErrorMessage = {
        id: messages.length + 2,
        type: "bot",
        message: "Oops, something went wrong! Please try again.",
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, botErrorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-quicksand">
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-white/50 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
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
          
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-8 border-t bg-gradient-to-r from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm">
          <div className="flex gap-4 items-end">
            <div className="flex-1 relative">
              <Input
                placeholder="Share what's on your mind... 💭"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="mindful-input-child child-focus text-base font-medium placeholder:text-gray-400 pr-12"
                disabled={isTyping}
              />
              {newMessage && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Heart className="w-5 h-5 text-pink-400 animate-gentle-pulse" />
                </div>
              )}
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={isTyping || !newMessage.trim()}
              className="mindful-button-child w-16 h-16 p-0 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Send className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChildChat;
