import { injectable } from "inversify";
import { db, Transaction } from "@/drizzle";
import {
    CreateInvoice,
    InvoiceEntityWithAllRelations,
    invoices,
} from "@/drizzle/schemas/invoices";
import { IInvoiceRepository } from "@/src/invoice/application/repositories/invoice.repository";
import { Invoice } from "@/src/invoice/domain/invoice.entity";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { InvoiceMapper } from "../mappers/invoice.mapper";
import { desc, eq } from "drizzle-orm";
import { DataBaseException } from "@/src/shared/infrastructure/exceptions/common.exceptions";

@injectable()
export class InvoiceRepository implements IInvoiceRepository {
    public async getInvoiceDetails(
        invoiceId: string
    ): Promise<InvoiceEntityWithAllRelations | null> {
        try {
            const invoiceEntity = await db.query.invoices.findFirst({
                where: eq(invoices.id, invoiceId),
                with: {
                    business: {
                        with: {
                            user: true,
                            address: true,
                        },
                    },
                    client: {
                        with: {
                            address: true,
                        },
                    },
                    status: true,
                    invoiceItems: true,
                },
            });

            if (!invoiceEntity) return null;

            return invoiceEntity;
        } catch (error) {
            console.log("DATABASE GET ERROR (invoice repository)", error);
            throw new BadRequestException();
        }
    }

    public async update(
        invoiceId: string,
        properties: Partial<Pick<CreateInvoice, "statusId" | "lastEmailSentAt">>
    ): Promise<Invoice> {
        try {
            const [updatedInvoiceEntity] = await db
                .update(invoices)
                .set(properties)
                .where(eq(invoices.id, invoiceId))
                .returning();

            return InvoiceMapper.toDomain(updatedInvoiceEntity);
        } catch (error) {
            console.log("DATABASE UPDATE ERROR (invoice repository)", error);
            throw new BadRequestException();
        }
    }

    public async remove(invoiceId: string): Promise<void> {
        try {
            await db.delete(invoices).where(eq(invoices.id, invoiceId));
        } catch (error) {
            console.log("DATABASE DELETE ERROR (invoice repository)", error);
            throw new BadRequestException();
        }
    }

    public async getAll(businessId: string): Promise<Invoice[] | []> {
        try {
            const invoiceEntities = await db.query.invoices.findMany({
                where: eq(invoices.businessId, businessId),
                orderBy: [desc(invoices.createdAt)],
            });

            return invoiceEntities.map((entity) =>
                InvoiceMapper.toDomain(entity)
            );
        } catch (error) {
            console.log("DATABASE GET ERROR (invoice repository)", error);
            throw new BadRequestException();
        }
    }

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
            throw new DataBaseException();
        }
    }
}
