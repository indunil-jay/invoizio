import { Invoice } from "@/src/invoice/domain/invoice.entity";
import { randomUUID } from "crypto";
import { injectable } from "inversify";

export interface IInvoiceFactory {
    create(
        businessId: string,
        clientId: string,
        description: string,
        issueDate: Date,
        dueDate: Date,
        totalPrice: number,
        totalBasePrice: number,
        totalDiscount: number,
        totalTax: number,
        statusId: number
    ): Invoice;
}

@injectable()
export class InvoiceFactory implements IInvoiceFactory {
    create(
        businessId: string,
        clientId: string,
        description: string,
        issueDate: Date,
        dueDate: Date,
        totalPrice: number,
        totalBasePrice: number,
        totalDiscount: number,
        totalTax: number,
        statusId: number
    ): Invoice {
        const id = randomUUID();
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
}
