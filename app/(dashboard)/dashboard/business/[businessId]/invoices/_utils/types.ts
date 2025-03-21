import { createInvoiceItemFormSchema } from "@/shared/validation-schemas/invoice/create-invoice-item-form-schema";
import { z } from "zod";

export type InvoiceItem = z.infer<typeof createInvoiceItemFormSchema>;

export type Invoice = {
    id: string;
    businessId: string;
    clientId: string;
    description: string;
    issueDate: Date;
    dueDate: Date;
    totalPrice: string;
    totalBasePrice: string;
    totalDiscount: string | null;
    totalTax: string | null;
    statusId: number;
};
