import { ChatTurn, ChatOut, ParentOverview, ParentChild, TimelineEvent, LinkCodeCreateOut, OkOut } from '@/types';

// src/lib/api.ts
export const API_BASE =
  (import.meta.env.VITE_API_BASE as string)?.replace(/\/+$/,''); // trim trailing slash

export function requireToken(token?: string) {
  if (!token) throw new Error("Missing auth token. Please log in again.");
  return token;
}

export type Jsonish = Record<string, any>;

export async function request<T>(
  method: 'GET'|'POST'|'HEAD'|'OPTIONS',
  path: string,
  token: string,
  body?: unknown,
  headers: Record<string,string> = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      ...(method !== 'GET' ? {'Content-Type':'application/json'} : {}),
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  });
  // Helpful error surfacing
  if (!res.ok) {
    let msg: string;
    try { msg = await res.text(); } catch { msg = `${res.status} ${res.statusText}`; }
    throw new Error(`HTTP ${res.status}: ${msg}`);
  }
  // If no JSON, return as any
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return (await res.text()) as unknown as T;
  return res.json() as Promise<T>;
}

export const getJSON = <T,>(path: string, token: string) => request<T>('GET', path, token);
export const postJSON = <T,>(path: string, body: unknown, token: string) => request<T>('POST', path, token, body);

// Chat endpoints
export async function sendChatMessage(childId: string, turns: ChatTurn[], token: string): Promise<ChatOut> {
  return postJSON('/api/chat', { child_id: childId, turns }, token);
}

export async function ingestChatMessage(childId: string, role: string, content: string, token: string): Promise<OkOut> {
  return postJSON('/api/chat/ingest', { child_id: childId, role, content }, token);
}

// Child data endpoints  
export async function submitMood(childId: string, mood: string, moodScore: number, note: string | undefined, token: string): Promise<OkOut> {
  return postJSON('/api/mood', { child_id: childId, mood, mood_score: moodScore, note }, token);
}

export async function submitJournal(childId: string, text: string, token: string): Promise<OkOut> {
  return postJSON('/api/journal', { child_id: childId, text }, token);
}

export async function getGames(token: string): Promise<any[]> {
  return getJSON('/api/games', token);
}

export async function ingestGameSession(childId: string, activity: string, delta: number, token: string): Promise<OkOut> {
  return postJSON('/api/game', { child_id: childId, activity, delta }, token);
}

// Parent endpoints
export async function getParentSummary(parentId: string, token: string): Promise<ParentOverview> {
  return getJSON(`/api/parent/summary?parent_id=${parentId}`, token);
}

export async function getParentChildren(parentId: string, token: string): Promise<ParentChild[]> {
  return getJSON(`/api/parent/children?parent_id=${parentId}`, token);
}

export async function getChildTimeline(childId: string, token: string): Promise<TimelineEvent[]> {
  return getJSON(`/api/parent/child/${childId}/timeline`, token);
}

// Family linking
export async function createLinkCode(parentId: string, token: string): Promise<LinkCodeCreateOut> {
  return postJSON('/api/parent/create-link', { parent_id: parentId }, token);
}

export async function assignChild(code: string, displayName: string, token: string): Promise<OkOut> {
  return postJSON('/api/assign-child', { code, display_name: displayName }, token);
}