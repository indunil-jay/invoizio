import { Separator } from "@/app/_components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/app/_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { DynamicBreadCumb } from "../_components/custom/dynamic-breadcumb";
import { getAllBusiness } from "./dashboard/business/queries";
import { getUserById } from "./dashboard/account/queries";
import { auth } from "@/src/auth";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (!session?.user?.id) return null;

    const businesses = await getAllBusiness();

    const user = await getUserById(session.user.id);
    if (!user) return null;
    return (
        <SidebarProvider>
            <AppSidebar businesses={businesses} user={user} />
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
