import { CreateInvoice, InvoiceEntity } from "@/drizzle/schemas/invoices";
import { Invoice } from "@/src/invoice/domain/invoice.entity";

export class InvoiceMapper {
    static toDomain(invoiceEntity: InvoiceEntity): Invoice {
        const {
            id,
            businessId,
            clientId,
            description,
            dueDate,
            issueDate,
            statusId,
            totalBasePrice,
            totalDiscount,
            totalTax,
            totalPrice,
        } = invoiceEntity;
        return new Invoice(
            id,
            businessId,
            clientId,
            description,
            issueDate,
            dueDate,
            totalPrice,
            totalBasePrice,
            totalDiscount,
            totalTax,
            statusId
        );
    }

    static toPersistence(data: CreateInvoice): CreateInvoice {
        return { ...data };
    }
}
