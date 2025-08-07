import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export type MoodType = 'very_sad' | 'sad' | 'neutral' | 'happy' | 'very_happy';

interface GameSession {
  id: string;
  game_name: string;
  mood_before?: MoodType;
  mood_after?: MoodType;
  start_time: string;
  end_time?: string;
}

export const useGameSession = () => {
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const startGameSession = async (gameName: string, moodBefore?: MoodType) => {
    if (!user) return null;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('game_sessions')
        .insert({
          child_id: user.id,
          game_name: gameName,
          mood_before: moodBefore,
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentSession(data);
      return data;
    } catch (error) {
      console.error('Error starting game session:', error);
      toast({
        title: "Error",
        description: "Failed to start game session",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const endGameSession = async (sessionId: string, moodAfter?: MoodType) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('game_sessions')
        .update({
          end_time: new Date().toISOString(),
          mood_after: moodAfter,
        })
        .eq('id', sessionId);

      if (error) throw error;

      setCurrentSession(null);
      return true;
    } catch (error) {
      console.error('Error ending game session:', error);
      toast({
        title: "Error",
        description: "Failed to end game session",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logGameEvent = async (sessionId: string, eventType: string, value?: string) => {
    try {
      const { error } = await supabase
        .from('game_events')
        .insert({
          session_id: sessionId,
          event_type: eventType,
          value: value,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging game event:', error);
    }
  };

  return {
    currentSession,
    loading,
    startGameSession,
    endGameSession,
    logGameEvent,
  };
};