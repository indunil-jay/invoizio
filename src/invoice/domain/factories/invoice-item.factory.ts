import { injectable } from "inversify";
import { randomUUID } from "crypto";
import { InvoiceItem } from "@/src/invoice/domain/invoice-item.entity";

export interface IInvoiceItemFactory {
    create(
        invoiceId: string,
        name: string,
        price: number,
        quantity: number,
        taxRate: number,
        discountRate: number
    ): InvoiceItem;
}

@injectable()
export class InvoiceItemFactory implements IInvoiceItemFactory {
    create(
        invoiceId: string,
        name: string,
        price: number,
        quantity: number,
        taxRate: number,
        discountRate: number
    ): InvoiceItem {
        const id = randomUUID();
        return new InvoiceItem(
            id,
            invoiceId,
            name,
            price,
            quantity,
            taxRate,
            discountRate
        );
    }
}
