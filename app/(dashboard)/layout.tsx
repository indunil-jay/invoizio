"use client";
import { Separator } from "@/app/_components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/app/_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { DynamicBreadCumb } from "../_components/custom/dynamic-breadcumb";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <DynamicBreadCumb />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
