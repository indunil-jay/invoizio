import { Invoice } from "../invoice.entity";

export class InvoicePaymentReminderSentEvent {
    constructor(public readonly invoice: Invoice) {}
}
