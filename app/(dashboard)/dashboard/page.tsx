import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashboardClient from "../_components/dashboard-client";
import { User } from "@/app/stores/user-store";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth/sign-in");
    }

    return <DashboardClient user={session.user as User} />;
}
