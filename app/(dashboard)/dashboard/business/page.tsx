import { redirect } from "next/navigation";
import { getAllBusinesses } from "./queries";

export default async function Page() {
    const allBusinesses = await getAllBusinesses();

    if (!allBusinesses || allBusinesses.length === 0) {
        redirect(`/dashboard/business/create`);
    }
    redirect(`/dashboard/business/${allBusinesses[0].id}/invoices`);
}
