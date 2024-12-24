import { db, Transaction } from "@/drizzle";
import {
  CreateInvoiceItemsInput,
  InvoiceItemsCollectionDocument,
  invoiceItems,
} from "@/drizzle/schemas/invoice-items";
import { IInvoiceItemsRepository } from "@/src/application/repositories/invoice-item-repository.interface";
import { injectable } from "inversify";

import { DataBaseError } from "@/src/infastructure/errors/errors";

@injectable()
export class InvoiceItemsRepository implements IInvoiceItemsRepository {
  async insert(
    data: CreateInvoiceItemsInput,
    tx?: Transaction
  ): Promise<InvoiceItemsCollectionDocument> {
    const invoker = tx ?? db;

    try {
      const query = invoker.insert(invoiceItems).values(data).returning();

      const [insertedItemInvoice] = await query.execute();
      if (!insertedItemInvoice) {
        throw new Error("Invoice Items creation failed, no data returned.");
      }

      return insertedItemInvoice;
    } catch (error) {
      console.error(`DATABASE_ERROR::InvoiceItemsRepository::create: ${error}`);
      throw new DataBaseError();
    }
  }
}
