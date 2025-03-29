import { injectable } from "inversify";
import { InvoiceItem } from "@/src/invoice/domain/invoice-item.entity";

export interface IInvoiceItemFactory {
    create(
        id: string,
        invoiceId: string,
        name: string,
        price: string,
        quantity: number,
        taxRate: string | null,
        discountRate: string | null
    ): InvoiceItem;
}

@injectable()
export class InvoiceItemFactory implements IInvoiceItemFactory {
    create(
        id: string,
        invoiceId: string,
        name: string,
        price: string,
        quantity: number,
        taxRate: string,
        discountRate: string
    ): InvoiceItem {
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
