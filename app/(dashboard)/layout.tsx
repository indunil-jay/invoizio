import { Separator } from "@/app/_components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/app/_components/ui/sidebar";
import { DynamicBreadCumb } from "../_components/custom/dynamic-breadcumb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./dashboard/account/queries";
import { User } from "../stores/user-store";
import { getAllBusinesses } from "./dashboard/business/queries";
import { BusinessClient } from "./dashboard/_components/business-client";
import { Business } from "../stores/business-store";
import DashboardClient from "./dashboard/_components/dashboard-client";
import { AppSidebar } from "./dashboard/_components/app-sidebar";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth/sign-in");
    }

    const user = await getCurrentUser();
    const allBusinesses = await getAllBusinesses();

    if (allBusinesses.length === 0) {
        redirect("/dashboard/business/create");
    }

    return (
        <>
            <DashboardClient user={user as User} />
            <BusinessClient businesses={allBusinesses as Business[]} />

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
        </>
    );
}
