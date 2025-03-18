import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/app/_components/ui/sidebar";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export const SidebarNavMainSkelton = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {Array.from({ length: 2 }).map((_, index) => (
                    <Collapsible
                        key={index}
                        asChild
                        defaultOpen={index === 1}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton>
                                    <Skeleton className="h-6 w-6 rounded-md" />
                                    <Skeleton className="h-6 w-full rounded-md" />

                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {Array.from({ length: 3 }).map(
                                        (_, index) => (
                                            <SidebarMenuSubItem key={index}>
                                                <SidebarMenuSubButton asChild>
                                                    <Skeleton className="h-3 ml-3 w-[90%]" />
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )
                                    )}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};
