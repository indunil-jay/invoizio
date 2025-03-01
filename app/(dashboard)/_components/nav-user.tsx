"use client";

import Link from "next/link";
import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/app/_components/ui/sidebar";
import { signOut } from "next-auth/react";
import { useUserStore } from "@/app/stores/user-store";
import { SidebarProfileAvatarSkelton } from "@/app/(dashboard)/_components/skeltons/sidebar-profile-avatar-skelton";
import { SidebarProfileAvatar } from "@/app/(dashboard)/_components/sidebar-profile-avatar";

export function NavUser() {
    const { isMobile } = useSidebar();
    const isLoading = useUserStore((store) => store.isLoading);
    const user = useUserStore((store) => store.user);

    const onSubmit = async () => {
        await signOut();
    };

    const pending = isLoading || !user;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            {pending ? (
                                <SidebarProfileAvatarSkelton />
                            ) : (
                                <SidebarProfileAvatar user={user} />
                            )}

                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                {pending ? (
                                    <SidebarProfileAvatarSkelton />
                                ) : (
                                    <SidebarProfileAvatar user={user} />
                                )}
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link
                                    href="/dashboard/account"
                                    className=" flex items-center gap-2 [&>svg]:size-4 [&>svg]:shrink-0"
                                >
                                    <BadgeCheck />
                                    Account
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link
                                    href="/dashboard/activities"
                                    className=" flex items-center gap-2 [&>svg]:size-4 [&>svg]:shrink-0"
                                >
                                    <Bell />
                                    Activities
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onSubmit}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
