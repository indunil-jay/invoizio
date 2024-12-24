import { Transaction } from "@/drizzle";
import {
  CreateInvoicesInput,
  InvoicesCollectionDocument,
} from "@/drizzle/schemas/invoices";

export interface IInvoiceRepository {
  insert(
    data: CreateInvoicesInput,
    tx?: Transaction
  ): Promise<InvoicesCollectionDocument>;
}
