import { Transaction } from "@/drizzle";
import {
  CreateInvoicesInput,
  DetailInvoicesCollectionDocument,
  InvoicesCollectionDocument,
} from "@/drizzle/schemas/invoices";

export interface IInvoiceRepository {
  insert(
    data: CreateInvoicesInput,
    tx?: Transaction
  ): Promise<InvoicesCollectionDocument>;

  getAllByBusinessId(
    businessId: string
  ): Promise<DetailInvoicesCollectionDocument[]>;
}
