import { injectable } from "inversify";
import { db, Transaction } from "@/drizzle";
import {
    CreateInvoiceItem,
    invoiceItems,
} from "@/drizzle/schemas/invoice-items";
import { IInvoiceItemRepository } from "@/src/invoice/application/repositories/invoice-item.repository";
import { InvoiceItem } from "@/src/invoice/domain/invoice-item.entity";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { InvoiceItemMapper } from "../mappers/invoice-item.mapper";
import { eq } from "drizzle-orm";

@injectable()
export class InvoiceItemRepository implements IInvoiceItemRepository {
    public async remove(itemId: string, tx?: Transaction): Promise<void> {
        const invoker = tx ?? db;
        try {
            const mutation = invoker
                .delete(invoiceItems)
                .where(eq(invoiceItems.id, itemId));
            await mutation.execute();
        } catch (error) {
            console.log(
                "DATABASE REMOVE ERROR (invoice items repository)",
                error
            );
            throw new BadRequestException();
        }
    }

    public async getAll(
        invoiceId: string,
        tx?: Transaction
    ): Promise<InvoiceItem[] | []> {
        const invoker = tx ?? db;
        try {
            const query = invoker.query.invoiceItems.findMany({
                where: eq(invoiceItems.invoiceId, invoiceId),
            });
            const entities = await query.execute();
            return entities.map((entity) => InvoiceItemMapper.toDomain(entity));
        } catch (error) {
            console.log(
                "DATABASE GET ALL ERROR (invoice items repository)",
                error
            );
            throw new BadRequestException();
        }
    }

    public async insert(
        data: CreateInvoiceItem,
        tx?: Transaction
    ): Promise<InvoiceItem> {
        const invoker = tx ?? db;
        try {
            const persistenceModel = InvoiceItemMapper.toPersistence(data);
            const mutation = invoker
                .insert(invoiceItems)
                .values(persistenceModel)
                .returning();
            const [insertedEntity] = await mutation.execute();
            return InvoiceItemMapper.toDomain(insertedEntity);
        } catch (error) {
            console.log(
                "DATABASE INSERT ERROR (invoice items repository)",
                error
            );
            throw new BadRequestException();
        }
    }
}
