import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { sendChatMessage } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Bot, Heart, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DiagnosticPanel } from "./DiagnosticPanel";
import { ChatTurn } from "@/types";

type Turn = { role: 'user' | 'assistant'; content: string };

export default function ChildChat() {
  const { session, user } = useAuth();
  const { toast } = useToast();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !!user && !!session?.access_token, [input, user, session]);

  useEffect(() => { 
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [turns, typing]);

  const typeMessage = async (message: string) => {
    setTyping(true);
    const words = message.split(' ');
    let currentMessage = '';
    
    for (let i = 0; i < words.length; i++) {
      currentMessage += (i > 0 ? ' ' : '') + words[i];
      setTurns(prev => {
        const newTurns = [...prev];
        if (newTurns[newTurns.length - 1]?.role === 'assistant') {
          newTurns[newTurns.length - 1] = { role: 'assistant', content: currentMessage };
        } else {
          newTurns.push({ role: 'assistant', content: currentMessage });
        }
        return newTurns;
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setTyping(false);
  };

  async function onSend() {
    if (!canSend || sending) return;
    setError(null);
    const userTurn: Turn = { role: 'user', content: input.trim() };
    setTurns(prev => [...prev, userTurn]);
    setInput("");
    setSending(true);
    
    try {
      const token = session?.access_token;
      if (!token) throw new Error('Not authenticated');
      
      // Convert turns to ChatTurn format for API
      const chatTurns: ChatTurn[] = [...turns, userTurn].map(turn => ({
        role: turn.role,
        content: turn.content
      }));
      
      const response = await sendChatMessage(user!.id, chatTurns, token);
      await typeMessage(response.reply || "I'm here to help! Can you tell me more?");
    } catch (e: any) {
      setError(e.message || String(e));
      toast({
        title: "Chat Error",
        description: "We couldn't reach the server. Please check your internet or try again.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  }

  const addFeedback = (feedback: 'like' | 'love') => {
    toast({
      title: feedback === 'like' ? "👍 Thanks!" : "❤️ So glad to help!",
      description: "Your feedback helps me learn!"
    });
  };

  return (
    <div className="flex flex-col h-full bg-background p-4 gap-4">
      {/* Header with therapy avatar */}
      <Card className="bg-card shadow-md rounded-2xl">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Mindful AI</h2>
            <p className="text-sm text-muted-foreground">Your caring companion</p>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostics banner */}
      {(!user || !session?.access_token || error) && (
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="p-4">
            <div className="text-destructive text-sm space-y-1">
              {!session?.access_token && <div>Missing auth token. Please sign in again.</div>}
              {!user && <div>Please sign in to continue.</div>}
              {error && <div><strong>Chat error:</strong> {error}</div>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diagnostic Panel */}
      <details className="text-sm">
        <summary className="cursor-pointer text-muted-foreground">Connection Status</summary>
        <div className="mt-2">
          <DiagnosticPanel />
        </div>
      </details>

      {/* Chat transcript */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2">
        {turns.length === 0 && (
          <Card className="bg-accent/20 border-accent">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Hello there! 👋</h3>
              <p className="text-muted-foreground">
                I'm here to listen and help you with your feelings. 
                What's on your mind today?
              </p>
            </CardContent>
          </Card>
        )}
        
        {turns.map((turn, i) => (
          <div key={i} className={`flex gap-3 ${turn.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {turn.role === 'assistant' && (
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <Card className={`max-w-[80%] ${
              turn.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border shadow-sm'
            }`}>
              <CardContent className="p-4">
                <p className="text-base leading-relaxed">{turn.content}</p>
                {turn.role === 'assistant' && i === turns.length - 1 && !typing && (
                  <div className="flex gap-2 mt-3 pt-2 border-t border-border/20">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addFeedback('like')}
                      className="h-8 text-xs"
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Helpful
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addFeedback('love')}
                      className="h-8 text-xs"
                    >
                      <Heart className="w-3 h-3 mr-1" />
                      Love it
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            {turn.role === 'user' && (
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🧒</span>
              </div>
            )}
          </div>
        ))}
        
        {typing && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <Card className="bg-card border shadow-sm">
              <CardContent className="p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>

      {/* Message composer */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) onSend(); }}
              placeholder="Share what's on your mind..."
              className="flex-1 text-base p-3 rounded-xl border-border/50"
              disabled={sending}
            />
            <Button
              onClick={onSend}
              disabled={!canSend || sending}
              className="px-6 py-3 rounded-xl text-base font-medium"
            >
              {sending ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}