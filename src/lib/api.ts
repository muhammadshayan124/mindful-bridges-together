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