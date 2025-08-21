import { postJSON } from '@/lib/api';
import { OkOut } from '@/types';

export function useGameTelemetry(childId: string, token: string) {
  let start = 0;
  
  return {
    startSession() { 
      start = Date.now(); 
    },
    async endSession(activity: string, delta: number = 0) {
      try { 
        await postJSON<OkOut>('/api/ingest/game', { 
          child_id: childId, 
          activity, 
          delta 
        }, token); 
      } catch (error) {
        console.warn('Could not sync game session:', error);
      }
    }
  };
}