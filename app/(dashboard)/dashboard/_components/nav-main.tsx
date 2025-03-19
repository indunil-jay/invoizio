"use client";

import { ChevronRight, ReceiptText } from "lucide-react";
import { Settings2 } from "lucide-react";

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
import { useParams } from "next/navigation";
import Link from "next/link";

const data = [
  {
    title: "Invoices",
    url: "",
    icon: ReceiptText,
    isActive: false,
    items: [
      {
        title: "Create Invoice",
        url: "/dashboard/business/[businessId]/invoices/create",
      },
      {
        title: "Activities",
        url: "/dashboard/business/[businessId]/invoices/activities",
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
];

export function NavMain() {
  const params = useParams();
  const businessId = Array.isArray(params.businessId)
    ? params.businessId[0]
    : params.businessId;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {data.map((item) => (
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
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={subItem.url.replace("[businessId]", businessId)}
                        >
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
