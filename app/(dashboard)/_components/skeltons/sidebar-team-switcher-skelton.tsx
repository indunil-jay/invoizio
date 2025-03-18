import { Avatar } from "@/app/_components/ui/avatar";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { Skeleton } from "@/app/_components/ui/skeleton";

export const SidebarTeamSwitcherSkelton = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Businesses</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar className="flex aspect-square size-7 items-center justify-center rounded-md ">
                            <Skeleton className="rounded-md size-7" />
                        </Avatar>

                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                <Skeleton className="h-4 w-full" />
                            </span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};
