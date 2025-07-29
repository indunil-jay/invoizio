import { Invoice } from "@/src/invoice/domain/invoice.entity";

export class InvoiceCreated {
    constructor(public readonly invoice: Invoice) {}
}
