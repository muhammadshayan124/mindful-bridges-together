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
import { useConnectionToast } from "@/components/ToastNotification";

const queryClient = new QueryClient();

function App() {
  useConnectionToast();
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="mindful-app-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <ChildProvider>
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
            </ChildProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
