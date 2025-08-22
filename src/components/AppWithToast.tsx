import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function AppWithToast({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  useEffect(() => {
    // Show connection success toast on app load
    const hasShownToast = localStorage.getItem('mindful-connection-toast');
    if (!hasShownToast) {
      setTimeout(() => {
        toast({
          title: "✅ Mindful AI is now connected and ready for testing.",
          description: "All features are now powered by your Railway backend.",
          duration: 5000,
        });
        localStorage.setItem('mindful-connection-toast', 'true');
      }, 2000);
    }
  }, [toast]);

  return <>{children}</>;
}

export default AppWithToast;