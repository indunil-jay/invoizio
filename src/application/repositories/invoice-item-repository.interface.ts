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
}
