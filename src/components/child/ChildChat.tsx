
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Heart } from "lucide-react";

const mockMessages = [
  { id: 1, type: "bot", message: "Hi there! I'm your AI buddy. How are you feeling today? 😊", timestamp: "2 minutes ago" },
  { id: 2, type: "user", message: "I'm feeling a bit worried about school tomorrow", timestamp: "2 minutes ago" },
  { id: 3, type: "bot", message: "I understand that feeling worried about school is normal. What specifically is making you feel worried? Is it a test, friends, or something else?", timestamp: "1 minute ago" },
  { id: 4, type: "user", message: "I have a math test and I'm not good at math", timestamp: "1 minute ago" },
  { id: 5, type: "bot", message: "It sounds like you're feeling anxious about the math test. That's completely understandable! Remember, it's okay not to be perfect at everything. What have you done to prepare for the test so far? 📚✨", timestamp: "30 seconds ago" },
];

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 justify-start mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
        <Bot className="w-6 h-6 text-white" />
      </div>
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 rounded-3xl rounded-bl-lg max-w-xs shadow-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

const ChildChat = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      message: newMessage,
      timestamp: "Just now"
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsTyping(true);
    
    // Simulate bot response with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const botResponses = [
        "Thank you for sharing that with me. How does talking about it make you feel? 💙",
        "I'm here to listen and support you. What would help you feel better right now? 🌟",
        "That sounds important to you. Tell me more about how you're handling this. ✨",
        "I understand. Remember, you're doing great by talking about your feelings! 🌈"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        id: messages.length + 2,
        type: "bot" as const,
        message: randomResponse,
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-quicksand">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-3 font-poppins">
          Chat with Your AI Buddy 🤖
        </h1>
        <p className="text-lg text-blue-600 font-medium">
          Share your thoughts and feelings in a safe, caring space
        </p>
      </div>
      
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 backdrop-blur-sm border-2 border-blue-200 rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-[500px] overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white/30 to-white/10">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
            >
              {msg.type === "bot" && (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className="flex flex-col max-w-sm lg:max-w-md">
                <div
                  className={`px-6 py-4 rounded-3xl shadow-lg ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-lg"
                      : "bg-gradient-to-r from-white to-gray-50 text-gray-800 rounded-bl-lg border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed font-medium">{msg.message}</p>
                </div>
                <span className={`text-xs text-gray-500 mt-2 font-medium ${
                  msg.type === "user" ? "text-right" : "text-left"
                }`}>
                  {msg.timestamp}
                </span>
              </div>
              
              {msg.type === "user" && (
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && <TypingIndicator />}
        </div>
        
        <div className="p-6 border-t bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm">
          <div className="flex gap-4 items-end">
            <div className="flex-1 relative">
              <Input
                placeholder="Share what's on your mind... 💭"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded-2xl border-2 border-blue-200 focus:border-blue-400 bg-white/90 backdrop-blur-sm py-4 px-6 text-base font-medium placeholder:text-gray-500 transition-all duration-200"
                disabled={isTyping}
              />
              {newMessage && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Heart className="w-4 h-4 text-pink-400" />
                </div>
              )}
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={isTyping || !newMessage.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl w-14 h-14 p-0 shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6 text-white" />
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 font-medium">
              💝 Remember: You're safe here, and your feelings matter
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChildChat;
