import {
  HistoryIcon,
  Settings,
  Users
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useLocation } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Staffs",
    url: "/staffs",
    icon: Users,
  },
  {
    title: "Transactions History",
    url: "/transactions",
    icon: HistoryIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="justify-center items-center">
      <SidebarHeader className="text-center text-lg py-8 font-medium">
        Speechless Bank
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === `/admin${item.url}`; // Check active route.

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size={"lg"}>
                      <a
                        href={`/admin${item.url}`}
                        className={`pl-10 flex items-center gap-2 rounded-md ${
                          isActive && "bg-teal-200" // Active styles
                        }`}
                      >
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
