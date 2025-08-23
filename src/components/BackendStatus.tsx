import { useState, useEffect } from 'react';
import { health, API_BASE } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function BackendStatus() {
  const [healthStatus, setHealthStatus] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkHealth = async () => {
    setIsChecking(true);
    try {
      if (!API_BASE) {
        setHealthStatus(0);
        return;
      }
      
      const response = await fetch(`${API_BASE}/healthz`);
      setHealthStatus(response.status);
    } catch {
      setHealthStatus(0);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  // Only show in development
  if (!import.meta.env.DEV) return null;

  const isHealthy = healthStatus === 200;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg max-w-sm">
      <div className="flex items-center gap-2 text-xs">
        <Badge variant={isHealthy ? "default" : "destructive"}>
          {isHealthy ? "API OK" : "API ERROR"}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={checkHealth}
          disabled={isChecking}
          className="h-6 w-6 p-0"
        >
          <RefreshCw className={`h-3 w-3 ${isChecking ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        <div>Base: {API_BASE || 'Not configured'}</div>
        <div>Status: {healthStatus || 'Unknown'}</div>
      </div>
    </div>
  );
}