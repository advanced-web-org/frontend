import {
  ArrowRightLeft,
  HistoryIcon,
  LayoutDashboard,
  ReceiptText,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavLink, useLocation } from "react-router-dom";
import { NavUser } from "@/components/nav-user";
import { useUserStore } from "@/stores/userStore";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transfer",
    url: "/transfer",
    icon: ArrowRightLeft,
  },
  {
    title: "Debt",
    url: "/debt",
    icon: ReceiptText,
  },
  {
    title: "Beneficiary",
    url: "/beneficiary",
    icon: Users,
  },
  {
    title: "Transactions History",
    url: "/history",
    icon: HistoryIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function CustomerSidebar() {
  const location = useLocation();
  const user = useUserStore((state) => state.user);

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
                const isActive = location.pathname === `/customer${item.url}`; // Check active route.

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size={"lg"}>
                      <NavLink
                        to={`/customer${item.url}`}
                        className={`pl-10 flex items-center gap-2 rounded-md ${
                          isActive && "bg-teal-200" // Active styles
                        }`}
                      >
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: user?.fullname, email: user?.email }} />
      </SidebarFooter>
    </Sidebar>
  );
}
