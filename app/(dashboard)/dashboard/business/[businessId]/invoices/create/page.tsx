import { CreateInvoiceClient } from "./_components/create-invoice-client";

export default async function Page({
    params,
}: {
    params: { businessId: string };
}) {
    return (
        <div className="max-w-2xl w-full mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-4">
                Create a New Invoice
            </h1>
            <p className="text-neutral-600 text-center mb-6">
                Fill in the details below to generate an invoice for your
                business. Ensure all information is accurate before sending it
                to your clients.
            </p>
            <CreateInvoiceClient businessId={params.businessId} />
        </div>
    );
}
