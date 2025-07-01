
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
  const { signOut, profile } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar 
      className="border-r border-calm-200 dark:border-serenity-700 bg-gradient-to-b from-white/95 via-calm-50/90 to-lavender-50/95 dark:from-serenity-900/95 dark:via-serenity-800/90 dark:to-serenity-900/95 backdrop-blur-xl"
      collapsible={isMobile ? "icon" : "none"}
    >
      <SidebarHeader className="p-6 border-b border-calm-100 dark:border-serenity-700">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
          <Heart className="w-8 h-8 text-pink-500 flex-shrink-0 group-hover:scale-110 transition-transform animate-pulse" />
          <div className="min-w-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-calm-600 via-lavender-600 to-mint-600 dark:from-calm-400 dark:via-lavender-400 dark:to-mint-400 bg-clip-text text-transparent font-poppins truncate">
              MindfulBuddy
            </h2>
            <p className="text-sm text-serenity-500 dark:text-serenity-400 font-quicksand truncate">
              {profile ? `Hi, ${profile.full_name}! ✨` : 'Parent Dashboard'}
            </p>
          </div>
        </Link>
        <div className="mt-4 flex justify-center">
          <ThemeToggle />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-serenity-500 dark:text-serenity-400 uppercase tracking-wider font-poppins mb-3">
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
                          ? 'bg-gradient-to-r from-calm-500 via-lavender-500 to-mint-500 text-white shadow-xl border-l-4 border-white animate-pulse-glow' 
                          : 'hover:bg-gradient-to-r hover:from-calm-100 hover:to-lavender-100 dark:hover:from-serenity-700 dark:hover:to-serenity-600 text-serenity-700 dark:text-serenity-300 hover:text-calm-700 dark:hover:text-calm-300 hover:shadow-lg'
                      }`}
                    >
                      <Link to={item.url} className="flex items-center gap-3 px-4 min-w-0">
                        <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                          isActive 
                            ? 'text-white animate-bounce' 
                            : 'text-serenity-500 dark:text-serenity-400 group-hover:scale-110'
                        }`} />
                        <span className={`font-medium font-quicksand truncate ${
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
          <SidebarGroupLabel className="text-xs font-medium text-serenity-500 dark:text-serenity-400 uppercase tracking-wider font-poppins mb-3">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="h-12 rounded-xl hover:bg-gradient-to-r hover:from-calm-100 hover:to-mint-100 dark:hover:from-serenity-700 dark:hover:to-serenity-600 text-calm-600 dark:text-calm-400 hover:text-calm-700 dark:hover:text-calm-300 transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
                  className="h-12 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700 transition-all duration-300 hover:scale-105"
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
