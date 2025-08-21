export type ChatTurn = { role: 'user'|'assistant'; content: string };
export type ChatOut = { reply: string; sentiment?: number; triage?: 'none'|'low'|'medium'|'high' };

export type ParentChild = { child_id: string; display_name: string };

export type ParentOverview = {
  children: Array<{
    child_id: string;
    name: string;
    risk: 'low'|'medium'|'high';
    last_7_days: Array<{ day: string; avg_sentiment: number; high_risk_count: number; wellbeing: number }>;
  }>;
};

export type TimelineEvent =
  | { type: 'mood'; created_at: string; mood: string; mood_score: number; note?: string }
  | { type: 'journal'; created_at: string; text: string; sentiment?: number }
  | { type: 'chat'; created_at: string; role: 'user'|'assistant'; content: string; sentiment?: number; triage_level?: 'none'|'low'|'medium'|'high' }
  | { type: 'game'; created_at: string; activity: string; delta: number };

export type LinkCodeCreateOut = { code: string; expires_at: string };
export type LinkCodeConsumeIn = { code: string; display_name: string };
export type OkOut = { ok: true; sentiment?: number };