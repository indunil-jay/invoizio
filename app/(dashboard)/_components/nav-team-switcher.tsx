"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/_components/ui/sidebar";
import { Business } from "../dashboard/business/type";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { fallbackUsername } from "@/app/_lib/fallback-username";
import { useRouter } from "next/navigation";
import { CreateBusinessForm } from "../dashboard/business/_components/create-business-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

interface TeamSwitcherBusinessProps {
  businesses: Business[];
}

export function TeamSwitcher({ businesses }: TeamSwitcherBusinessProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [activeBusiness, setActiveBusiness] = React.useState<Business>(
    businesses[0]
  );

  const setActiveBusinessHandler = (business: Business) => {
    setActiveBusiness(business);
    router.push(`/dashboard/business/${business.id}`);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel> Businesses</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="flex aspect-square size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                    <AvatarImage
                      className="size-7 rounded-md"
                      src={activeBusiness.image ?? " "}
                      alt={activeBusiness.name}
                    />
                    <AvatarFallback className="size-7 rounded-md bg-primary">
                      {fallbackUsername(activeBusiness.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeBusiness.name}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Businesses
                </DropdownMenuLabel>
                {businesses.map((business, index) => (
                  <DropdownMenuItem
                    key={business.name}
                    onClick={() => setActiveBusinessHandler(business)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <Avatar className="flex aspect-square size-6 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
                        <AvatarImage
                          className="size-6 rounded-sm"
                          src={business.image ?? " "}
                          alt={business.name}
                        />
                        <AvatarFallback className="size-6 rounded-sm bg-primary">
                          {fallbackUsername(business.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    {business.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>

                  <DialogTrigger asChild>
                    <div className="font-medium text-muted-foreground">
                      Add Business
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="max-w-lg w-full mx-auto"
                  >
                    <CreateBusinessForm />
                  </DialogContent>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
