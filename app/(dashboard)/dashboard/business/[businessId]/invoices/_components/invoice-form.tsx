"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/app/_components/ui/button";
import {
    useInvoiceItems,
    useProducts,
} from "../_contexts/invoice-items-context";
import { User } from "@/app/stores/user-store";
import { Business } from "@/app/stores/business-store";
import { createInvoiceSchema } from "@/shared/validation-schemas/invoice/create-invoice-form-schema";
import { BillFromFormSection } from "./bill-from-form-section";
import { BillToFormSection } from "./bill-to-form-section";
import { Separator } from "@/app/_components/ui/separator";
import { BillDetailsFormSection } from "./bill-details-form-section";
import { InvoiceItemsList } from "./invoice-items-list";
import { InvoiceItem } from "../_utils/types";

interface InvoiceFormProps {
    user: User;
    business: Business;
    invoiceId?: string;
    mode: "create" | "update";
    onClose?: () => void;
    existingInvoice?: any;
}

export const InvoiceForm = ({
    user,
    business,
    invoiceId,
    mode,
    existingInvoice,
    onClose,
}: InvoiceFormProps) => {
    const {
        invoiceItems,
        setInvoiceItems,
        grandTotal,
        totalBasePrice,
        totalDiscount,
        totalTax,
    } = useInvoiceItems();
    const form = useForm<z.infer<typeof createInvoiceSchema>>({
        resolver: zodResolver(createInvoiceSchema),
        defaultValues: {
            user: {
                id: user.id,
                email: user.email,
            },
            business: {
                address: {
                    addressLine1: business.address.addressLine1,
                    addressLine2: business.address.addressLine2 ?? "",
                    city: business.address.city,
                    postalCode: business.address.postalCode,
                },
                id: business.id,
                name: business.name,
            },

            client: {
                name: existingInvoice ? existingInvoice.client.name : "",
                email: existingInvoice ? existingInvoice.client.email : "",
                address: {
                    addressLine1: existingInvoice
                        ? existingInvoice.client.address.addressLine1
                        : "",
                    addressLine2: existingInvoice
                        ? existingInvoice.client.address.addressLine2
                        : "",
                    city: existingInvoice
                        ? existingInvoice.client.address.city
                        : "",
                    postalCode: existingInvoice
                        ? existingInvoice.client.address.postalCode
                        : "",
                },
            },
            invoice: {
                description: existingInvoice
                    ? existingInvoice.description
                    : " ",
                issueDate: existingInvoice
                    ? new Date(existingInvoice.issueDate)
                    : new Date(),
                dueDate: existingInvoice
                    ? new Date(existingInvoice.dueDate)
                    : undefined,
            },
            invoiceItems: existingInvoice
                ? ([
                      ...existingInvoice.invoiceItems,
                      ...invoiceItems,
                  ] as InvoiceItem[])
                : invoiceItems,
        },
    });

    const router = useRouter();

    useEffect(() => {
        if (existingInvoice && mode === "update") {
            setInvoiceItems([...existingInvoice.invoiceItems] as InvoiceItem[]);
        }
    }, [existingInvoice, mode, setInvoiceItems]);

    const handleAddProduct = (product: InvoiceItem) => {
        setInvoiceItems((prevProducts) => {
            const updatedProducts = [...prevProducts, product];
            form.setValue("invoiceItems", updatedProducts);
            return updatedProducts;
        });
    };

    const onSubmit = async (data: z.infer<typeof createInvoiceSchema>) => {
        const obj = {
            user: data.user,
            client: data.client,
            business: data.business,
            invoice: {
                id: mode === "create" ? invoiceId : existingInvoice!.id,
                grandTotal,
                totalBasePrice,
                totalDiscount,
                totalTax,
                description: data.invoice.description,
                issueDate: data.invoice.issueDate,
                dueDate: data.invoice.dueDate,
            },
            invoiceItems: data.invoiceItems,
        };

        console.log({ obj });
        // const response =
        //     mode === "create"
        //         ? await createNewInvoice(obj)
        //         : await updateInvoice(obj);

        // toast(response);

        // onClose?.();
        // router.refresh();
    };
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BillFromFormSection />
                    <BillToFormSection mode={mode} />
                </div>
                <Separator />
                <BillDetailsFormSection />

                <Separator />

                <InvoiceItemsList
                    products={invoiceItems || form.getValues("invoiceItems")}
                    onAddProduct={handleAddProduct}
                />

                <Separator />

                <div className="flex justify-end items-center gap-5">
                    <Button
                        size={"lg"}
                        variant={"secondary"}
                        onClick={(e) => {
                            e.preventDefault();
                            onClose?.();
                        }}
                    >
                        Cancle
                    </Button>
                    <Button
                        disabled={form.formState.isSubmitting}
                        type="submit"
                        size={"lg"}
                    >
                        {form.formState.isSubmitting
                            ? mode === "create"
                                ? "Creating Invoice..."
                                : "Updating Invoice..."
                            : mode === "create"
                              ? "Create Invoice"
                              : "Update Invoice"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
