export type TriageLevel = 'none' | 'low' | 'medium' | 'high';

export type ParentOverview = {
  children: Array<{
    child_id: string;
    name: string;
    risk: TriageLevel;
    last_alert_at?: string;
    last7: Array<{ day: string; avg_sentiment: number; high_risk_count: number }>;
    wellbeing_last7: Array<{ day: string; score: number }>;
    activity_impacts: Array<{ activity: string; avg_delta: number }>;
    best_activity?: string;
    latest_screeners?: { phq9?: { score: number; band: string }; gad7?: { score: number; band: string } };
  }>;
}

export type IngestChatResponse = {
  ok: boolean;
  sentiment: number; // -1..+1
  triage: { level: TriageLevel; signals: Record<string, unknown> };
  child_reply_override: string | null;
};

export type IngestJournalResponse = { 
  ok: boolean; 
  sentiment: number; 
};

export type IngestGameResponse = { 
  ok: boolean; 
  delta: number; 
};