
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
      <div className="min-h-screen flex w-full bg-gray-50">
        <ParentSidebar />
        <main className="flex-1 overflow-auto">
          {isMobile && (
            <div className="p-4 border-b bg-white">
              <SidebarTrigger className="mb-0" />
            </div>
          )}
          <Routes>
            <Route path="/" element={<Navigate to="/parent/dashboard" replace />} />
            <Route path="/dashboard" element={<ParentDashboard />} />
            <Route path="/children" element={<ParentChildren />} />
            <Route path="/reports" element={<ParentReports />} />
            <Route path="/settings" element={<ParentSettings />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ParentInterface;
