import {
    CreateInvoiceItem,
    InvoiceItemEntity,
} from "@/drizzle/schemas/invoice-items";
import { InvoiceItem } from "@/src/invoice/domain/invoice-item.entity";

export class InvoiceItemMapper {
    static toDomain(invoiceItem: InvoiceItemEntity): InvoiceItem {
        const { id, name, price, discountRate, invoiceId, quantity, taxRate } =
            invoiceItem;
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

    static toPersistence(data: CreateInvoiceItem): CreateInvoiceItem {
        return { ...data };
    }
}
