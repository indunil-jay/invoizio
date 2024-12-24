import { db, Transaction } from "@/drizzle";
import {
  CreateInvoicesInput,
  invoices,
  InvoicesCollectionDocument,
} from "@/drizzle/schemas/invoices";
import { IInvoiceRepository } from "@/src/application/repositories/invoice-repository.interface";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";

@injectable()
export class InvoiceRepository implements IInvoiceRepository {
  public async insert(
    data: CreateInvoicesInput,
    tx?: Transaction
  ): Promise<InvoicesCollectionDocument> {
    const invoker = tx ?? db;
    try {
      const query = invoker.insert(invoices).values(data).returning();

      const [insertedInvoice] = await query.execute();
      if (!insertedInvoice) {
        throw new Error("Invoice creation failed, no data returned.");
      }

      return insertedInvoice;
    } catch (error) {
      console.error(`DATABASE_ERROR::InvoiceRepository::create: ${error}`);
      throw new DataBaseError();
    }
  }
}
