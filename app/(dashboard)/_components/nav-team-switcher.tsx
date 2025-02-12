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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { fallbackUsername } from "@/app/_lib/fallback-username";
import { useRouter } from "next/navigation";
import { CreateBusinessForm } from "../dashboard/business/_components/create-business-form";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { Business } from "../dashboard/business/type";

import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useState } from "react";

export function TeamSwitcher({ businesses }: { businesses: Business[] }) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allBusinesses, setAllBusinesses] = useState<Business[]>(businesses);
  const [activeBusiness, setActiveBusiness] = useState<Business>(
    allBusinesses[0]
  );

  // Update active business and navigate when selecting a business
  const setActiveBusinessHandler = (business: Business) => {
    setActiveBusiness(business);
    router.push(`/dashboard/business/${business.id}/invoices`);
  };

  // Handle business creation
  const handleBusinessCreate = (newBusiness: Business) => {
    setAllBusinesses((prevBusinesses) => [newBusiness, ...prevBusinesses]);
    setActiveBusiness(newBusiness);
    setDialogOpen(false);
    setDropdownOpen(false);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Businesses</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="flex aspect-square size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                  <AvatarImage
                    className="size-7 rounded-md"
                    src={activeBusiness.image || " "}
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

              <ScrollArea className="h-auto max-h-60">
                {allBusinesses.map((business) => (
                  <DropdownMenuItem
                    key={business.id}
                    onClick={() => setActiveBusinessHandler(business)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <Avatar className="flex aspect-square size-6 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
                        <AvatarImage
                          className="size-6 rounded-sm"
                          src={business.image || " "}
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
              </ScrollArea>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDialogOpen(true)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>

                <div className="font-medium text-muted-foreground">
                  Add Business
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <Dialog open={dialogOpen && !dropdownOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg w-full mx-auto">
          <CreateBusinessForm
            handleBusinessCreate={handleBusinessCreate}
            onCloseModal={setDialogOpen}
          />
        </DialogContent>
      </Dialog>
    </SidebarGroup>
  );
}
