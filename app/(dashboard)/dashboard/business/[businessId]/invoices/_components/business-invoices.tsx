"use client";

import { Business, useBusinessStore } from "@/app/stores/business-store";
import { CreateInvoice } from "./create-invoice";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { InvoiceType } from "@/shared/types/invoice-response-type";
import { DataTable } from "./table/components/data-table";

import { Card, CardContent } from "@/app/_components/ui/card";
import { columns } from "./table/components/invoices-table/columns";

interface BusinessInvoicesProps {
    businessId: string;
    invoices: InvoiceType[];
}

export const BusinessInvoices = ({
    businessId,
    invoices,
}: BusinessInvoicesProps) => {
    const business = useBusinessStore((state) =>
        state.getBusinessById(businessId)
    );

    const hasInvoices = invoices.length > 0;

    return (
        <div className="mt-4 flex flex-col">
            <h2 className="text-xl font-semibold text-neutral-800">
                Invoice Management
            </h2>

            {business ? (
                <p className="text-muted-foreground">
                    View and manage all invoices for{" "}
                    <span className="font-medium">{business.name}</span>. Keep
                    track of transactions, payments, and pending invoices
                    efficiently.
                </p>
            ) : (
                <div className="flex flex-col gap-3 mt-2">
                    <Skeleton className="h-4 w-[70%]" />
                    <Skeleton className="h-4 w-[40%]" />
                </div>
            )}

            {!hasInvoices && (
                <div className="flex flex-col h-[150px] w-[300px] items-center justify-center gap-4 rounded-md border border-dashed self-center mt-20 text-sm">
                    <p className="text-muted-foreground">
                        No invoices found. Start by creating one.
                    </p>
                    {business ? (
                        <CreateInvoice business={business} />
                    ) : (
                        <Skeleton className="h-9 w-[100px] rounded-md" />
                    )}
                </div>
            )}

            {hasInvoices && business && (
                <InvoiceDataTable invoices={invoices} business={business} />
            )}
        </div>
    );
};

interface InvoiceDataTableProps {
    invoices: InvoiceType[];
    business: Business;
}

export const InvoiceDataTable = ({
    invoices,
    business,
}: InvoiceDataTableProps) => {
    return (
        <Card className="my-4">
            <CardContent>
                <DataTable
                    data={invoices}
                    columns={columns}
                    business={business}
                />
            </CardContent>
        </Card>
    );
};
