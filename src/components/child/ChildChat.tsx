
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Heart, Sparkles } from "lucide-react";

const mockMessages = [
  { 
    id: 1, 
    type: "bot", 
    message: "Hi there! I'm your AI buddy. 🌟 How are you feeling today?", 
    timestamp: "2 minutes ago" 
  },
  { 
    id: 2, 
    type: "user", 
    message: "I'm feeling a bit worried about school tomorrow", 
    timestamp: "2 minutes ago" 
  },
  { 
    id: 3, 
    type: "bot", 
    message: "I understand that feeling worried about school is completely normal. 💙 What specifically is making you feel worried? Is it a test, friends, or something else?", 
    timestamp: "1 minute ago" 
  },
  { 
    id: 4, 
    type: "user", 
    message: "I have a math test and I'm not good at math", 
    timestamp: "1 minute ago" 
  },
  { 
    id: 5, 
    type: "bot", 
    message: "It sounds like you're feeling anxious about the math test. That's completely understandable! 🌈 Remember, it's okay not to be perfect at everything. What have you done to prepare for the test so far? ✨", 
    timestamp: "30 seconds ago" 
  },
];

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
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
        "I understand. Remember, you're doing great by talking about your feelings! 🌈",
        "That's really brave of you to share. What else is on your mind today? 💜",
        "I can hear that this matters to you. How can we work through this together? 🤗"
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
      {/* Header */}
      <div className="mb-8 text-center animate-fade-in-up">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-mindful-accent animate-gentle-pulse" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-mindful-accent via-mindful-send-button to-mindful-mint bg-clip-text text-transparent font-quicksand">
            Chat with Your AI Buddy
          </h1>
          <Bot className="w-8 h-8 text-mindful-send-button animate-gentle-pulse" />
        </div>
        <p className="text-xl text-purple-600 dark:text-purple-300 font-medium">
          Share your thoughts and feelings in a safe, caring space 💙
        </p>
      </div>
      
      {/* Chat Container */}
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
          
          {/* Footer Message */}
          <div className="mt-6 text-center">
            <p className="text-sm text-purple-600 dark:text-purple-300 font-medium flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              Remember: You're safe here, and your feelings matter
              <Sparkles className="w-4 h-4 text-mindful-accent" />
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChildChat;
