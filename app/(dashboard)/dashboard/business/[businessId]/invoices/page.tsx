import { BusinessInvoices } from "./_components/business-invoices";

export default async function Page({
    params,
}: {
    params: { businessId: string };
}) {
    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col">
            <BusinessInvoices businessId={params.businessId} />
        </div>
    );
}
