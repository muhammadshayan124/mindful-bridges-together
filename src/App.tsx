import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChildInterface from "./pages/ChildInterface";
import ParentInterface from "./pages/ParentInterface";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppWithToast from "./components/AppWithToast";
import { BackendStatus } from "./components/BackendStatus";
import { useEffect, useState } from "react";
import { health, API_BASE } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const queryClient = new QueryClient();

function App() {
  const { toast } = useToast();
  const [showDevBanner, setShowDevBanner] = useState(false);

  useEffect(() => {
    // Health check on app start
    const checkBackendHealth = async () => {
      try {
        const result = await health();
        if (!result.ok) {
          const errorMsg = `Backend unreachable at VITE_API_BASE: ${API_BASE || 'not configured'}`;
          console.warn(errorMsg, result);
          
          if (import.meta.env.DEV) {
            setShowDevBanner(true);
          }
          
          toast({
            title: "Backend unreachable",
            description: "Some features may not work properly. Please try again later.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.warn('Health check failed:', error);
      }
    };

    checkBackendHealth();
  }, [toast]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="mindful-app-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppWithToast>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/child/*" element={<ChildInterface />} />
                <Route path="/parent/*" element={<ParentInterface />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <BackendStatus />
          </AppWithToast>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
