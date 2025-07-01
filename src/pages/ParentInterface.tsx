
import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ParentSidebar from "@/components/parent/ParentSidebar";
import ParentDashboard from "@/components/parent/ParentDashboard";
import ParentChildren from "@/components/parent/ParentChildren";
import ParentReports from "@/components/parent/ParentReports";
import ParentSettings from "@/components/parent/ParentSettings";
import { useIsMobile } from "@/hooks/use-mobile";

const ParentInterface = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full parent-interface font-inter">
        <ParentSidebar />
        <main className="flex-1 overflow-auto bg-mindful-parent-bg dark:bg-mindful-parent-dark-bg">
          {isMobile && (
            <div className="p-4 border-b bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm">
              <SidebarTrigger className="mb-0 hover:scale-105 transition-transform duration-200" />
            </div>
          )}
          <div className="animate-fade-in-up">
            <Routes>
              <Route path="/" element={<Navigate to="/parent/dashboard" replace />} />
              <Route path="/dashboard" element={<ParentDashboard />} />
              <Route path="/children" element={<ParentChildren />} />
              <Route path="/reports" element={<ParentReports />} />
              <Route path="/settings" element={<ParentSettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ParentInterface;
