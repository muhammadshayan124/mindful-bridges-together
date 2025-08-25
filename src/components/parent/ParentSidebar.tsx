
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
import { ThemeToggle } from "@/components/ThemeToggle";

const menuItems = [
  { title: "Dashboard", url: "/parent/dashboard", icon: BarChart3 },
  { title: "Children", url: "/parent/children", icon: Users },
  { title: "Reports", url: "/parent/reports", icon: FileText },
  { title: "Settings", url: "/parent/settings", icon: Settings },
];

const ParentSidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleSignOut = () => {
    window.location.href = '/';
  };

  return (
    <Sidebar className="bg-mindful-parent-sidebar dark:bg-mindful-parent-dark-sidebar border-r border-mindful-parent-border dark:border-mindful-dark-border shadow-xl">
      <SidebarHeader className="p-6 border-b border-mindful-parent-border/50 dark:border-mindful-dark-border/50 bg-white/10 dark:bg-black/10">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
          <Heart className="w-8 h-8 text-pink-400 flex-shrink-0 group-hover:scale-110 transition-transform animate-gentle-pulse" />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-white font-inter truncate">
              MindfulBuddy
            </h2>
            <p className="text-sm text-blue-100 font-inter truncate">
              Parent Dashboard
            </p>
          </div>
        </Link>
        <div className="mt-4 flex justify-center">
          <ThemeToggle />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6 bg-gradient-to-b from-mindful-parent-sidebar to-mindful-parent-header dark:from-mindful-parent-dark-sidebar dark:to-mindful-parent-dark-bg">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-blue-100 uppercase tracking-wider font-inter mb-4 px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`h-12 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isActive 
                          ? 'bg-mindful-success text-white shadow-xl border-l-4 border-white animate-gentle-pulse' 
                          : 'hover:bg-white/20 text-blue-100 hover:text-white hover:shadow-lg'
                      }`}
                    >
                      <Link to={item.url} className="flex items-center gap-3 px-4 min-w-0 w-full">
                        <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                          isActive 
                            ? 'text-white animate-gentle-pulse' 
                            : 'text-blue-200 group-hover:scale-110'
                        }`} />
                        <span className={`font-medium font-inter truncate ${
                          isActive ? 'text-white' : ''
                        }`}>
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
          <SidebarGroupLabel className="text-xs font-medium text-blue-100 uppercase tracking-wider font-inter mb-4 px-2">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="h-12 rounded-xl hover:bg-white/20 text-blue-100 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link to="/" className="flex items-center gap-3 px-4 min-w-0 w-full">
                    <Home className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium font-inter truncate">Back to Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="h-12 rounded-xl hover:bg-red-500/20 text-red-200 hover:text-red-100 transition-all duration-300 hover:scale-105"
                >
                  <button onClick={handleSignOut} className="flex items-center gap-3 px-4 min-w-0 w-full text-left">
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium font-inter truncate">Sign Out</span>
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
