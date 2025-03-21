"use client";

import { useBusinessStore } from "@/app/stores/business-store";
import { CreateInvoice } from "./create-invoice";

interface BusinessInvoicesProps {
    businessId: string;
}

export const BusinessInvoices = ({ businessId }: BusinessInvoicesProps) => {
    const business = useBusinessStore((state) =>
        state.getBusinessById(businessId)
    );

    if (!business) {
        return <>NO Business </>;
    }
    return (
        <div className="mt-4 flex flex-col ">
            <h2 className="text-xl font-semibold text-neutral-800">
                Invoice Management
            </h2>
            <p className="text-muted-foreground">
                View and manage all invoices for{" "}
                <span className="font-medium">{business.name}</span> business.
                Keep track of transactions, payments, and pending invoices
                efficiently.
            </p>

            <div className="flex flex-col  h-[150px] w-[300px] items-center justify-center gap-4 rounded-md border border-dashed self-center  mt-20 text-sm">
                <p className="text-muted-foreground ">
                    No Invoices Found Start Create One.
                </p>
                <CreateInvoice />
            </div>
        </div>
    );
};
