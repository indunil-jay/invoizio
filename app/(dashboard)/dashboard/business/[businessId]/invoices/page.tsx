import { Invoices } from "./_components/invoices";
import { redirect } from "next/navigation";
import { getUserById } from "../../../account/queries";
import { getBusinessById } from "../queries";
import { getAllInvoicesByBusinessId } from "./queries";
import { auth } from "@/auth";

export default async function Page({
    params,
}: {
    params: { businessId: string };
}) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        redirect("/auth/sign-in");
    }
    const user = await getUserById(session.user.id);

    const business = await getBusinessById(params.businessId);

    const invoices = await getAllInvoicesByBusinessId(params.businessId);

    if (!user) return null;

    if (!business) redirect("/dashboard/business/create");

    return (
        <div>
            <Invoices user={user} business={business} invoices={invoices} />
        </div>
    );
}
