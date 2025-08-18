import type { TriageLevel } from '@/types/api';

export default function RiskBadge({ level }: { level: TriageLevel }) {
  const label = level === 'high' ? '🛟 High' : level === 'medium' ? '⚠️ Medium' : level === 'low' ? '🟡 Low' : '🟢 None';
  const color = level === 'high' ? 'bg-red-100 text-red-700' :
                level === 'medium' ? 'bg-amber-100 text-amber-700' :
                level === 'low' ? 'bg-yellow-100 text-yellow-700' : 'bg-emerald-100 text-emerald-700';
  return <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>{label}</span>;
}