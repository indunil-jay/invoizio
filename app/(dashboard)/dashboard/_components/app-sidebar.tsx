"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/app/_components/ui/sidebar";

import { SidebarLogo } from "./nav-logo";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./nav-team-switcher";
import { useBusinessStore } from "@/app/stores/business-store";
import { SidebarTeamSwitcherSkelton } from "./skeltons/sidebar-team-switcher-skelton";
import { SidebarNavMainSkelton } from "./skeltons/sidebar-nav-main-skelton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const storeBusinesses = useBusinessStore((state) => state.businesses);
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarLogo />
            </SidebarHeader>
            <SidebarContent>
                {storeBusinesses.length > 0 ? (
                    <>
                        <TeamSwitcher businesses={storeBusinesses} />
                        <NavMain />
                    </>
                ) : (
                    <>
                        <SidebarTeamSwitcherSkelton />
                        <SidebarNavMainSkelton />
                    </>
                )}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
