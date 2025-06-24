
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
import { BarChart3, Users, FileText, Settings, Heart, Home } from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/parent/dashboard", icon: BarChart3 },
  { title: "Children", url: "/parent/children", icon: Users },
  { title: "Reports", url: "/parent/reports", icon: FileText },
  { title: "Settings", url: "/parent/settings", icon: Settings },
];

const ParentSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar className="border-r-2 border-gray-200">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-pink-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">MindfulBuddy</h2>
            <p className="text-sm text-gray-500">Parent Dashboard</p>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url} className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="flex items-center gap-3 text-blue-600">
                    <Home className="w-5 h-5" />
                    <span>Back to Home</span>
                  </Link>
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
