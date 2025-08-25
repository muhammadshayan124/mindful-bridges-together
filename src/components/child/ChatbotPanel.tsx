import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { sendChatMessage } from "@/lib/api";
import { ChatTurn } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ChatbotPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatbotPanel = ({ isOpen, onToggle }: ChatbotPanelProps) => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm MindfulBuddy! How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const messagesRef = useRef(messages);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading || !user || !session?.access_token) return;

    const userMessage = message.trim();
    const newMessage = {
      id: Date.now(),
      text: userMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const turns: ChatTurn[] = [
        ...messages.map(msg => ({ 
          role: msg.isBot ? 'assistant' as const : 'user' as const, 
          content: msg.text 
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await sendChatMessage(user.id, turns, session.access_token);

      const botResponse = {
        id: Date.now() + 1,
        text: response.reply,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);

      if (response.triage && response.triage !== 'none') {
        toast({
          title: "Support available",
          description: "If you need immediate help, please talk to a trusted adult.",
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorResponse = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorResponse]);
      
      toast({
        title: "Connection error",
        description: "Unable to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save conversation when chat closes
  const handleToggle = () => {
    onToggle();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl z-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-800 dark:text-white flex items-center gap-2">
            🤖 MindfulBuddy
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-2xl text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="rounded-full border-gray-300 dark:border-gray-600 focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            disabled={isLoading || !message.trim()}
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotPanel;