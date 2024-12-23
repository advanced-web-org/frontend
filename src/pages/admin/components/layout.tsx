import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin-sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <main className="p-3 w-screen">
        <SidebarTrigger />
        <div className="mx-12 my-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
