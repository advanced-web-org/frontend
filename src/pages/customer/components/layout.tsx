import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CustomerSidebar } from "./cus-sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <CustomerSidebar />

      <main className="p-3 w-screen">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
