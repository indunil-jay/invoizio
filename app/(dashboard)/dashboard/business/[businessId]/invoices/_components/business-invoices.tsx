"use client";

import { useBusinessStore } from "@/app/stores/business-store";
import { CreateInvoice } from "./create-invoice";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Invoice } from "../_utils/types";

interface BusinessInvoicesProps {
    businessId: string;
    invoices: Invoice[] | [];
}

export const BusinessInvoices = ({
    businessId,
    invoices,
}: BusinessInvoicesProps) => {
    const business = useBusinessStore((state) =>
        state.getBusinessById(businessId)
    );

    return (
        <div className="mt-4 flex flex-col ">
            <h2 className="text-xl font-semibold text-neutral-800">
                Invoice Management
            </h2>

            {business ? (
                <p className="text-muted-foreground">
                    View and manage all invoices for{" "}
                    <span className="font-medium">{business?.name}</span>{" "}
                    business. Keep track of transactions, payments, and pending
                    invoices efficiently.
                </p>
            ) : (
                <div className="flex flex-col gap-3 mt-2">
                    <Skeleton className="h-4 w-[70%] " />
                    <Skeleton className="h-4 w-[40%]" />
                </div>
            )}

            {invoices.length === 0 ? (
                <div className="flex flex-col  h-[150px] w-[300px] items-center justify-center gap-4 rounded-md border border-dashed self-center  mt-20 text-sm">
                    <p className="text-muted-foreground ">
                        No Invoices Found Start Create One.
                    </p>

                    {business ? (
                        <CreateInvoice business={business} />
                    ) : (
                        <Skeleton className="h-9 rounded-md w-[100px]" />
                    )}
                </div>
            ) : (
                JSON.stringify(invoices)
            )}
        </div>
    );
};
