export default function Sparkline({ 
  points, 
  min = -1, 
  max = 1, 
  height = 40 
}: { 
  points: Array<{x: string | number, y: number}>, 
  min?: number, 
  max?: number, 
  height?: number 
}) {
  if (!points?.length) {
    return <div className="h-10 text-xs text-muted-foreground">No data</div>;
  }

  const w = 160, h = height, pad = 4;
  const xs = points.map((_, i) => pad + (i * (w - 2 * pad)) / Math.max(points.length - 1, 1));
  const ys = points.map(p => {
    const t = Math.max(0, Math.min(1, (p.y - min) / (max - min)));
    return pad + (1 - t) * (h - 2 * pad);
  });
  
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  
  return (
    <svg width={w} height={h} className="overflow-visible">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}