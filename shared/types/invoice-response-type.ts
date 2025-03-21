import { ClientType } from "./client-response-type";

export type InvoiceType = {
    id: string;
    businessId: string;
    description: string;
    issueDate: Date;
    dueDate: Date;
    totalPrice: string;
    totalBasePrice: string;
    totalDiscount: string | null;
    totalTax: string | null;
    statusId: number;
    client: ClientType;
};
