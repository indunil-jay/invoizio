import { injectable } from "inversify";
import { db, Transaction } from "@/drizzle";
import { CreateInvoice, invoices } from "@/drizzle/schemas/invoices";
import { IInvoiceRepository } from "@/src/invoice/application/repositories/invoice.repository";
import { Invoice } from "@/src/invoice/domain/invoice.entity";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { InvoiceMapper } from "../mappers/invoice.mapper";
import { eq } from "drizzle-orm";

@injectable()
export class InvoiceRepository implements IInvoiceRepository {
    public async get(invoiceId: string): Promise<Invoice | null> {
        try {
            const invoiceEntity = await db.query.invoices.findFirst({
                where: eq(invoices.id, invoiceId),
            });

            if (!invoiceEntity) return null;

            return InvoiceMapper.toDomain(invoiceEntity);
        } catch (error) {
            console.log("DATABASE GET ERROR (invoice repository)", error);
            throw new BadRequestException();
        }
    }

    public async insert(
        data: CreateInvoice,
        tx?: Transaction
    ): Promise<Invoice> {
        const invoker = tx ?? db;
        try {
            const persistenceModel = InvoiceMapper.toPersistence(data);
            const mutation = invoker
                .insert(invoices)
                .values(persistenceModel)
                .returning();
            const [insertedEntity] = await mutation.execute();
            return InvoiceMapper.toDomain(insertedEntity);
        } catch (error) {
            console.log("DATABASE INSERT ERROR (invoice repository)", error);
            throw new BadRequestException();
        }
    }
}
