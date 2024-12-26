import { Transaction } from "@/drizzle";
import {
  CreateInvoicesInput,
  DetailInvoicesCollectionDocument,
  InvoicesCollectionDocument,
  PartialUpdateInvoicesCollectionDocument,
} from "@/drizzle/schemas/invoices";

export interface IInvoiceRepository {
  insert(
    data: CreateInvoicesInput,
    tx?: Transaction
  ): Promise<InvoicesCollectionDocument>;

  getAllByBusinessId(
    businessId: string
  ): Promise<DetailInvoicesCollectionDocument[]>;

  getById(invoiceId: string): Promise<InvoicesCollectionDocument | undefined>;
  deleteById(invoiceId: string): Promise<void>;

  update(
    data: PartialUpdateInvoicesCollectionDocument,
    id: string,
    tx?: Transaction
  ): Promise<InvoicesCollectionDocument>;
}
