import type { IngestChatResponse, IngestJournalResponse, IngestGameResponse, ParentOverview, TriageLevel } from '@/types/api';

const BASE_URL = import.meta.env.VITE_API_URL ?? '';
const MOCK = !BASE_URL;

// For backward compatibility with existing code
export const API_BASE = BASE_URL || "https://mindfullbuddy-production.up.railway.app";

if (MOCK) {
  console.warn("API in MOCK mode (no backend configured). Set VITE_API_URL to use real backend.");
}

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(BASE_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  
  return res.json();
}

function randomDelay() {
  return new Promise(resolve => setTimeout(resolve, 250 + Math.random() * 350));
}

function mockTriageLevel(): TriageLevel {
  const rand = Math.random();
  if (rand < 0.02) return 'high';
  if (rand < 0.10) return 'medium';
  if (rand < 0.18) return 'low';
  return 'none';
}

export async function ingestChat(childId: string, text: string): Promise<IngestChatResponse> {
  if (MOCK) {
    await randomDelay();
    const sentiment = -0.2 + Math.random() * 0.7;
    const level = mockTriageLevel();
    return {
      ok: true,
      sentiment,
      triage: { level, signals: {} },
      child_reply_override: level === 'high' ? "I understand you're going through something difficult. Let's take a moment to breathe together, and then we can talk to someone who can help." : null
    };
  }
  
  return postJSON<IngestChatResponse>('/api/ingest/chat', { child_id: childId, text });
}

export async function ingestJournal(childId: string, text: string): Promise<IngestJournalResponse> {
  if (MOCK) {
    await randomDelay();
    return {
      ok: true,
      sentiment: -0.1 + Math.random() * 0.5
    };
  }
  
  return postJSON<IngestJournalResponse>('/api/ingest/journal', { child_id: childId, text });
}

export async function ingestGameSession(input: { 
  childId: string; 
  activity: string; 
  mood_before: string; 
  mood_after: string; 
  duration_seconds: number; 
}): Promise<IngestGameResponse> {
  const { childId, ...rest } = input;
  
  if (MOCK) {
    await randomDelay();
    return {
      ok: true,
      delta: -1 + Math.random() * 3
    };
  }
  
  return postJSON<IngestGameResponse>('/api/ingest/game-session', { child_id: childId, ...rest });
}

export async function getParentOverview(parentId: string): Promise<ParentOverview> {
  if (MOCK) {
    await randomDelay();
    const mockChildren = ['Emma', 'Lucas'].map((name, i) => ({
      child_id: `child_${i + 1}`,
      name,
      risk: i === 0 ? mockTriageLevel() : 'none' as TriageLevel,
      last_alert_at: i === 0 && Math.random() < 0.3 ? new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() : undefined,
      last7: Array.from({ length: 7 }, (_, j) => ({
        day: new Date(Date.now() - (6 - j) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        avg_sentiment: -0.5 + Math.random(),
        high_risk_count: Math.floor(Math.random() * 3)
      })),
      wellbeing_last7: Array.from({ length: 7 }, (_, j) => ({
        day: new Date(Date.now() - (6 - j) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        score: 3 + Math.random() * 4
      })),
      activity_impacts: [
        { activity: 'Breathing exercises', avg_delta: 0.5 + Math.random() * 1.5 },
        { activity: 'Gratitude journal', avg_delta: 0.3 + Math.random() * 1.2 },
        { activity: 'Mindful maze', avg_delta: 0.2 + Math.random() * 0.8 }
      ],
      best_activity: 'Breathing exercises',
      latest_screeners: {
        phq9: { score: Math.floor(Math.random() * 15), band: 'Mild' },
        gad7: { score: Math.floor(Math.random() * 12), band: 'Low' }
      }
    }));
    
    return { children: mockChildren };
  }
  
  const res = await fetch(`${BASE_URL}/api/parent/overview?parent_id=${encodeURIComponent(parentId)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<ParentOverview>;
}