import { ChatTurn, ChatOut, ParentOverview, ParentChild, TimelineEvent, LinkCodeCreateOut, OkOut } from '@/types';

// src/lib/api.ts
export const API_BASE =
  (import.meta.env.VITE_API_BASE as string)?.replace(/\/+$/,''); // trim trailing slash

export function requireToken(token?: string) {
  if (!token) throw new Error("Missing auth token. Please log in again.");
  return token;
}

export type Jsonish = Record<string, any>;

// Health check helper
export async function health(): Promise<{ ok: boolean; status: number; error?: string }> {
  try {
    if (!API_BASE) {
      const error = 'VITE_API_BASE not configured';
      console.warn(error);
      return { ok: false, status: 0, error };
    }
    const res = await fetch(`${API_BASE}/healthz`);
    return { ok: res.ok, status: res.status };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Network error';
    return { ok: false, status: 0, error: errorMsg };
  }
}

export async function request<T>(
  method: 'GET'|'POST'|'HEAD'|'OPTIONS',
  path: string,
  token: string,
  body?: unknown,
  headers: Record<string,string> = {}
): Promise<T> {
  if (!API_BASE) {
    throw new Error('Backend API not configured. Please set VITE_API_BASE.');
  }
  
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      ...(method !== 'GET' ? {'Content-Type':'application/json'} : {}),
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  });
  
  // Friendly error messages
  if (!res.ok) {
    let msg: string;
    try { 
      msg = await res.text(); 
    } catch { 
      msg = `${res.status} ${res.statusText}`; 
    }
    
    // Transform common errors to user-friendly messages
    if (msg.includes('Failed to fetch') || res.status === 0) {
      throw new Error('We couldn\'t reach the server. Please check your internet or try again.');
    }
    
    throw new Error(`HTTP ${res.status}: ${msg}`);
  }
  
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
export async function submitMood(childId: string, mood: string, note?: string, token?: string): Promise<OkOut> {
  return postJSON('/api/ingest/mood', { child_id: childId, mood, note }, requireToken(token));
}

export async function submitJournal(childId: string, text: string, token: string): Promise<OkOut> {
  return postJSON('/api/ingest/journal', { child_id: childId, text }, token);
}

export async function getGames(token: string): Promise<any[]> {
  return getJSON('/api/games', token);
}

export async function ingestGameSession(childId: string, activity: string, delta: number, token: string): Promise<OkOut> {
  return postJSON('/api/ingest/game', { child_id: childId, activity, delta }, token);
}

// Parent endpoints
export async function getParentSummary(token: string, days = 7): Promise<ParentOverview> {
  return getJSON(`/api/parent/overview?days=${days}`, token);
}

export async function getParentChildren(token: string): Promise<ParentChild[]> {
  return getJSON('/api/parent/children', token);
}

export async function getChildTimeline(childId: string, token: string, days = 7): Promise<TimelineEvent[]> {
  return getJSON(`/api/parent/child/${childId}/timeline?days=${days}`, token);
}

// Family linking
export async function createLinkCode(token: string): Promise<LinkCodeCreateOut> {
  return postJSON('/api/parent/link-code/create', {}, token);
}

export async function assignChild(code: string, displayName: string, token: string): Promise<{ child_id: string; parent_id: string }> {
  return postJSON('/api/child/link-code/consume', { code, display_name: displayName }, token);
}