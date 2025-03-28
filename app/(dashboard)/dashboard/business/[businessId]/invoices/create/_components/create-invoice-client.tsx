"use client";
import { useBusinessStore } from "@/app/stores/business-store";
import { InvoiceCreateCard } from "../../_components/create-invoice";
import { InvoiceFormCreateSkelton } from "./invoice-form-create-skelton";

interface CreateInvoiceClientProps {
    businessId: string;
}

export const CreateInvoiceClient = ({
    businessId,
}: CreateInvoiceClientProps) => {
    const business = useBusinessStore((state) =>
        state.getBusinessById(businessId)
    );

    return (
        <>
            {business ? (
                <InvoiceCreateCard business={business} />
            ) : (
                <InvoiceFormCreateSkelton />
            )}
        </>
    );
};
