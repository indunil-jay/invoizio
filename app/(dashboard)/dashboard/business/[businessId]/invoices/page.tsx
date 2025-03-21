import { BusinessInvoices } from "./_components/business-invoices";

export default async function Page({
    params,
}: {
    params: { businessId: string };
}) {
    const { businessId } = params;

    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col">
            <BusinessInvoices businessId={businessId} />
        </div>
    );
}
