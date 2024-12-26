import { db, Transaction } from "@/drizzle";
import {
  CreateInvoiceItemsInput,
  InvoiceItemsCollectionDocument,
  invoiceItems,
} from "@/drizzle/schemas/invoice-items";
import { IInvoiceItemsRepository } from "@/src/application/repositories/invoice-item-repository.interface";
import { injectable } from "inversify";
import { DataBaseError } from "@/src/infastructure/errors/errors";
import { eq } from "drizzle-orm";

@injectable()
export class InvoiceItemsRepository implements IInvoiceItemsRepository {
  public async insert(
    data: CreateInvoiceItemsInput,
    tx?: Transaction
  ): Promise<InvoiceItemsCollectionDocument> {
    const invoker = tx ?? db;

    try {
      const query = invoker.insert(invoiceItems).values(data).returning();

      const [insertedItemInvoice] = await query.execute();
      console.log({ insertedItemInvoice });
      if (!insertedItemInvoice) {
        throw new Error("Invoice Items creation failed, no data returned.");
      }

      return insertedItemInvoice;
    } catch (error) {
      console.error(`DATABASE_ERROR::InvoiceItemsRepository::create: ${error}`);
      throw new DataBaseError();
    }
  }

  public async update(
    data: CreateInvoiceItemsInput,
    invoiceId: string,
    tx?: Transaction
  ): Promise<InvoiceItemsCollectionDocument> {
    const invoker = tx ?? db;
    try {
      const query = invoker
        .update(invoiceItems)
        .set(data)
        .where(eq(invoiceItems.invoiceId, invoiceId))
        .returning();

      const [updatedItemInvoice] = await query.execute();

      if (!updatedItemInvoice) {
        throw new Error("Invoice Items update failed, no data returned.");
      }

      return updatedItemInvoice;
    } catch (error) {
      console.error(`DATABASE_ERROR::InvoiceItemsRepository::update: ${error}`);
      throw new DataBaseError();
    }
  }

  public async getAll(
    itemId: string,
    tx?: Transaction
  ): Promise<InvoiceItemsCollectionDocument[]> {
    const invoker = tx ?? db;

    try {
      const query = invoker.query.invoiceItems.findMany({
        where: eq(invoiceItems.invoiceId, itemId),
      });

      return await query.execute();
    } catch (error) {
      console.error(`DATABASE_ERROR::InvoiceItemsRepository::getAll: ${error}`);
      throw new DataBaseError();
    }
  }
}
