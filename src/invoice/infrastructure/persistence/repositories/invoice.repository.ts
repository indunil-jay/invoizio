import { injectable } from "inversify";
import { Transaction } from "@/drizzle";
import { CreateInvoice } from "@/drizzle/schemas/invoices";
import { IInvoiceRepository } from "@/src/invoice/application/repositories/invoice.repository";
import { Invoice } from "@/src/invoice/domain/invoice.entity";

@injectable()
export class InvoiceRepository implements IInvoiceRepository {
    insert(data: CreateInvoice, tx?: Transaction): Promise<Invoice> {
        throw new Error("Method not implemented.");
    }
}
