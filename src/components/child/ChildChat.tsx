
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";

const mockMessages = [
  { id: 1, type: "bot", message: "Hi there! I'm your AI buddy. How are you feeling today? 😊" },
  { id: 2, type: "user", message: "I'm feeling a bit worried about school tomorrow" },
  { id: 3, type: "bot", message: "I understand that feeling worried about school is normal. What specifically is making you feel worried? Is it a test, friends, or something else?" },
  { id: 4, type: "user", message: "I have a math test and I'm not good at math" },
  { id: 5, type: "bot", message: "It sounds like you're feeling anxious about the math test. That's completely understandable! Remember, it's okay not to be perfect at everything. What have you done to prepare for the test so far? 📚✨" },
];

const ChildChat = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      message: newMessage
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: "bot" as const,
        message: "Thank you for sharing that with me. How does talking about it make you feel? 💙"
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Chat with Your AI Buddy 🤖</h1>
        <p className="text-blue-600">Share your thoughts and feelings in a safe space</p>
      </div>
      
      <Card className="bg-white/70 backdrop-blur-sm border-2 border-blue-200 rounded-3xl overflow-hidden">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.type === "bot" && (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
              {msg.type === "user" && (
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-6 border-t bg-white/50">
          <div className="flex gap-3">
            <Input
              placeholder="Type your message here... 💭"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 rounded-full border-2 border-blue-200 focus:border-blue-400"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 rounded-full w-12 h-12 p-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChildChat;
