import { auth } from "@/src/auth";
import { getAllBusiness } from "./business/queries";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth/sign-in");
    }

    const businesses = await getAllBusiness();

    if (!businesses || businesses.length === 0) {
        redirect("/dashboard/business/create"); // No businesses → Go to creation page
    }

    // Get the latest created business
    const latestBusiness = businesses[0]; // Assuming the first one is the latest
    redirect(`/dashboard/business/${latestBusiness.id}/invoices`);

    return null; // This page never renders because of redirection
}
