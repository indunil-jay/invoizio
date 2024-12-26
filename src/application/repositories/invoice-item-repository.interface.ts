import { Transaction } from "@/drizzle";
import {
  CreateInvoiceItemsInput,
  InvoiceItemsCollectionDocument,
} from "@/drizzle/schemas/invoice-items";

export interface IInvoiceItemsRepository {
  insert(
    data: CreateInvoiceItemsInput,
    tx?: Transaction
  ): Promise<InvoiceItemsCollectionDocument>;

  update(
    data: CreateInvoiceItemsInput,
    itemId: string,
    tx?: Transaction
  ): Promise<InvoiceItemsCollectionDocument>;

  getAll(
    invoiceId: string,
    tx?: Transaction
  ): Promise<InvoiceItemsCollectionDocument[]>;
}
