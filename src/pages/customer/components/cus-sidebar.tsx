import {
  ArrowRightLeft,
  HistoryIcon,
  LayoutDashboard,
  ReceiptText,
  Settings,
} from "lucide-react";

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
    title: "Transactions History",
    url: "/history",
    icon: HistoryIcon,
  },
  {
    title: "Debt",
    url: "/debt",
    icon: ReceiptText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function CustomerSidebar() {
  return (
    <Sidebar className="justify-center items-center">
      <SidebarHeader className="text-center text-lg py-8 font-medium">
        Speechless Bank
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size={"lg"}>
                    <a href={`${"/user" + item.url}`} className="pl-10">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
