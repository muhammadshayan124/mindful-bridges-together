import { ingestGameSession } from '@/lib/api';

export function useGameTelemetry(childId: string) {
  let start = 0;
  
  return {
    startSession() { 
      start = Date.now(); 
    },
    async endSession(activity: string, mood_before: string, mood_after: string) {
      const duration_seconds = Math.max(1, Math.round((Date.now() - start) / 1000));
      try { 
        await ingestGameSession({ childId, activity, mood_before, mood_after, duration_seconds }); 
      } catch (error) {
        console.warn('Could not sync game session:', error);
        // toast.warn('Could not sync game session')
      }
    }
  };
}