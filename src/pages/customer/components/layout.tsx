import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CustomerSidebar } from "./cus-sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <SidebarProvider>
      <CustomerSidebar />

      <main className="p-3 w-screen bg-gray-50">
        <SidebarTrigger />
        <Outlet />
        <Toaster />

      </main>
    </SidebarProvider>
  );
}
