import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import { Separator } from "@/app/_components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import { getUserById } from "./dashboard/account/queries";
import { DynamicBreadCumb } from "../_components/custom/dynamic-breadcumb";
import { getAllBusiness } from "./dashboard/business/queries";
import { Dialog } from "../_components/ui/dialog";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) redirect("/auth/sign-in");

  const user = await getUserById(session.user.id);
  if (!user) return null;

  const businesses = await getAllBusiness();

  if (!businesses || businesses.length === 0) {
    redirect("/dashboard/business/create");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} businesses={businesses} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadCumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
