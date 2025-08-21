// src/lib/chatTransport.ts
type Turn = { role: 'user'|'assistant'; content: string };

type ChatReply = { reply?: string } & Record<string, any>;

type EndpointCandidate = '/api/chat' | '/chat';
type ShapeKey = 'v1_turns_child' | 'v2_messages_childId' | 'v3_simple_text';

const STORAGE_KEY = 'CHAT_ENDPOINT_SHAPE';

type StoredCfg = { path: EndpointCandidate; shape: ShapeKey };

function getStoredCfg(): StoredCfg | null {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
function setStoredCfg(cfg: StoredCfg) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); } catch {} }

function shapes(child_id: string, turns: Turn[], latestUserText: string) {
  // v1 (our preferred contract)
  const v1 = { body: { child_id, turns }, key: 'v1_turns_child' as const, check: (r: any) => r?.reply || r?.assistant };
  // v2 (common alt)
  const v2 = { body: { childId: child_id, messages: turns }, key: 'v2_messages_childId' as const, check: (r: any) => r?.reply || r?.assistant };
  // v3 (very simple servers expecting just the latest text + conversation id)
  const v3 = { body: { user_input: latestUserText, conversation_id: child_id }, key: 'v3_simple_text' as const, check: (r: any) => r?.reply || typeof r === 'string' };
  return [v1, v2, v3];
}

export async function smartSendChat(
  token: string,
  child_id: string,
  turns: Turn[],
  apiBase: string,
): Promise<{ replyText: string; raw: ChatReply; used: StoredCfg }> {
  const latest = [...turns].reverse().find(t => t.role === 'user');
  const latestUserText = latest?.content ?? '';

  // 1) Try cached config first
  const cached = getStoredCfg();
  const paths: EndpointCandidate[] = ['/api/chat', '/chat'];
  const tryPaths = cached ? [cached.path, ...paths.filter(p => p !== cached.path)] : paths;

  const payloads = shapes(child_id, turns, latestUserText);

  // Helper for POST
  async function post(path: string, body: any) {
    const res = await fetch(`${apiBase}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? (await res.json()) : { reply: await res.text() };
  }

  // 2) Iterate through candidates until one works
  for (const path of tryPaths) {
    for (const shape of payloads) {
      try {
        const raw = await post(path, shape.body);
        const replyText =
          typeof raw === 'string' ? raw :
          raw.reply ?? raw.assistant ?? raw.message ?? '';
        if (replyText) {
          const used: StoredCfg = { path: path as EndpointCandidate, shape: shape.key };
          setStoredCfg(used);
          return { replyText, raw, used };
        }
      } catch (e) {
        // keep trying next combination
      }
    }
  }

  // If all attempts failed, throw a helpful error
  throw new Error(
    `Could not reach chat endpoint at ${apiBase} (tried /api/chat and /chat with multiple payloads). ` +
    `Possible causes: invalid token, CORS, wrong path, or server error.`
  );
}

export function clearChatDiscoveryCache() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}
