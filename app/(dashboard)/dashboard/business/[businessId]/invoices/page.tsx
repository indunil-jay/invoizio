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

    if (!user) return null;

    return (
        <div>
            {/* <Invoices user={user} business={business} invoices={invoices} /> */}
        </div>
    );
}
