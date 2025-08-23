import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChildProvider } from "@/contexts/ChildContext";
import Index from "./pages/Index";
import AuthPage from "./components/auth/AuthPage";
import ChildInterface from "./pages/ChildInterface";
import ParentInterface from "./pages/ParentInterface";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppWithToast from "./components/AppWithToast";
import { useEffect } from "react";
import { health } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const queryClient = new QueryClient();

function App() {
  const { toast } = useToast();

  useEffect(() => {
    // Health check on app start
    const checkBackendHealth = async () => {
      try {
        const isHealthy = await health();
        if (!isHealthy) {
          console.warn('Backend unreachable at startup');
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
          <AuthProvider>
            <ChildProvider>
              <AppWithToast>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route 
                    path="/child/*" 
                    element={
                      <ProtectedRoute requiredRole="child">
                        <ChildInterface />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/parent/*" 
                    element={
                      <ProtectedRoute requiredRole="parent">
                        <ParentInterface />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              </AppWithToast>
            </ChildProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
