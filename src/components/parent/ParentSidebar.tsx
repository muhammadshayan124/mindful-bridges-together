
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BarChart3, Users, FileText, Settings, Heart, Home, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { title: "Dashboard", url: "/parent/dashboard", icon: BarChart3 },
  { title: "Children", url: "/parent/children", icon: Users },
  { title: "Reports", url: "/parent/reports", icon: FileText },
  { title: "Settings", url: "/parent/settings", icon: Settings },
];

const ParentSidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { signOut, profile } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar 
      className="border-r border-gray-200 bg-white"
      collapsible={isMobile ? "icon" : "none"}
    >
      <SidebarHeader className="p-6 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Heart className="w-8 h-8 text-blue-500 flex-shrink-0" />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-800 font-poppins truncate">MindfulBuddy</h2>
            <p className="text-sm text-gray-500 font-quicksand truncate">
              {profile ? `Hi, ${profile.full_name}!` : 'Parent Dashboard'}
            </p>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins mb-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`h-12 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <Link to={item.url} className="flex items-center gap-3 px-4 min-w-0">
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`font-medium font-quicksand truncate ${isActive ? 'text-blue-700' : ''}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins mb-3">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="h-12 rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-all duration-200"
                >
                  <Link to="/" className="flex items-center gap-3 px-4 min-w-0">
                    <Home className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium font-quicksand truncate">Back to Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="h-12 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-200"
                >
                  <button onClick={handleSignOut} className="flex items-center gap-3 px-4 min-w-0 w-full">
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium font-quicksand truncate">Sign Out</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ParentSidebar;
