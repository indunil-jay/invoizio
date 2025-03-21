import { BusinessInvoices } from "./_components/business-invoices";
import { Invoice } from "./_utils/types";
import { getAllBusinessInvoices } from "./queries";

export default async function Page({
    params,
}: {
    params: { businessId: string };
}) {
    const { businessId } = params;
    const invoices = await getAllBusinessInvoices(businessId);

    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col">
            <BusinessInvoices
                businessId={businessId}
                invoices={invoices as Invoice[] | []}
            />
        </div>
    );
}
