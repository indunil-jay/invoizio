"use client";

import { Activity, ChevronRight, ReceiptText, Settings2 } from "lucide-react";

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
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const data = [
    {
        title: "Invoices",
        url: "/dashboard/business/[businessId]/invoices", // Updated base URL
        icon: ReceiptText,
        isActive: false,
        items: [
            {
                title: "Create Invoice",
                url: "/dashboard/business/[businessId]/invoices/create",
            },
        ],
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings2,
        isActive: true,
        items: [
            {
                title: "General",
                url: "/dashboard/business/[businessId]/settings/general",
            },
        ],
    },
    {
        title: "Activities",
        url: "/dashboard/business/[businessId]/activities",
        icon: Activity,
        isActive: false,
        items: [],
    },
];

export function NavMain() {
    const params = useParams();
    const businessId = Array.isArray(params.businessId)
        ? params.businessId[0]
        : params.businessId;

    const pathname = usePathname(); // Get the current path

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {data.map((item) =>
                    item.items && item.items.length > 0 ? (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={item.isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <SidebarMenuSubButton
                                                    asChild
                                                    className={`${
                                                        pathname ===
                                                        subItem.url.replace(
                                                            "[businessId]",
                                                            businessId
                                                        )
                                                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                            : ""
                                                    }`}
                                                >
                                                    <Link
                                                        href={subItem.url.replace(
                                                            "[businessId]",
                                                            businessId
                                                        )}
                                                    >
                                                        {subItem.title}
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className={`flex items-center gap-2 ${
                                    pathname ===
                                    item.url.replace("[businessId]", businessId)
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                        : ""
                                }`}
                            >
                                <Link
                                    href={item.url.replace(
                                        "[businessId]",
                                        businessId
                                    )}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
