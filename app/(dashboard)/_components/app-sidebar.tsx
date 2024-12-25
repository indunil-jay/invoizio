"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import { NavUser } from "./nav-user";
import { SidebarLogo } from "./nav-logo";
import { TeamSwitcher } from "./nav-team-switcher";
import { User } from "../dashboard/account/types";
import { Business } from "../dashboard/business/type";
import { NavMain } from "./nav-main";

export function AppSidebar({
  user,
  businesses,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  businesses: Business[];
  user: User;
}) {
  if (!businesses || !businesses.length) {
    return null;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <TeamSwitcher businesses={businesses} />
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
