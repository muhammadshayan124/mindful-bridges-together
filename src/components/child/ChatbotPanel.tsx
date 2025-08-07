import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatbotPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatbotPanel = ({ isOpen, onToggle }: ChatbotPanelProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm your MindfulBuddy! How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "That's wonderful to hear! Remember, I'm here whenever you need to talk. You can also try some of our fun games to boost your mood! 🌟",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

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
            onClick={onToggle}
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
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  msg.isBot
                    ? 'bg-gradient-to-r from-child-primary/20 to-child-secondary/20 text-child-primary border border-child-primary/20'
                    : 'bg-child-accent text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="rounded-full bg-child-background border-child-primary/20 focus:border-child-primary"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full bg-child-primary hover:bg-child-primary/90 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotPanel;