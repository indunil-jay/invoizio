import { injectable } from "inversify";
import { randomUUID } from "crypto";
import { InvoiceItem } from "@/src/invoice/domain/invoice-item.entity";

export interface IInvoiceItemFactory {
    create(
        invoiceId: string,
        name: string,
        price: string,
        quantity: number,
        taxRate: string,
        discountRate: string
    ): InvoiceItem;
}

@injectable()
export class InvoiceItemFactory implements IInvoiceItemFactory {
    create(
        invoiceId: string,
        name: string,
        price: string,
        quantity: number,
        taxRate: string,
        discountRate: string
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
