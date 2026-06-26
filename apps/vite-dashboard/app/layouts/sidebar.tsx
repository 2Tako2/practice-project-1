import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
} from "~/components/ui/sidebar";

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full flex-1">
        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Group 1</SidebarGroupLabel>
              <SidebarGroupAction>Action 1</SidebarGroupAction>
              <SidebarGroupContent>
                <h2>Content 1</h2>
                <h2>Content 2</h2>
                <SidebarMenu>
                  <SidebarMenuButton>menu button</SidebarMenuButton>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup />
          </SidebarContent>
        </Sidebar>
        <div className="flex min-w-0 flex-1 border-3 border-red-500 w-full">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
