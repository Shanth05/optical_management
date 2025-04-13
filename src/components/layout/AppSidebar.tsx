
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard,
  Glasses,
  CircleDot,
  ShoppingCart,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const location = useLocation();
  
  const mainMenuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: "Frames",
      icon: Glasses,
      path: "/frames",
    },
    {
      title: "Lenses",
      icon: CircleDot,
      path: "/lenses",
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      path: "/orders",
    }
  ];
  
  const settingsMenuItems = [
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <Link to="/" className="flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1 rounded-md">
              <Glasses className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">OptiManager</h1>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "flex items-center gap-3 px-3",
                        location.pathname === item.path && "text-primary"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "flex items-center gap-3 px-3",
                        location.pathname === item.path && "text-primary"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <LogOut className="h-5 w-5" />
            <span>Log out</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
