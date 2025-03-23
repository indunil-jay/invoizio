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

        const invoice = new Invoice(
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

        if (invoiceEntity.lastEmailSentAt) {
            invoice.setLastEmailSent(invoiceEntity.lastEmailSentAt);
        }

        return invoice;
    }

    static toPersistence(data: CreateInvoice): CreateInvoice {
        return { ...data };
    }
}
