import { Transaction } from "@/drizzle";
import {
  BusinessCollectionDocument,
  BusinessCollectionWithAddressDocument,
  InsertBusinessSchema,
  UpdateBusinessSchema,
} from "@/drizzle/schemas/business";

export interface IBusinessRepository {
  getById(
    id: string
  ): Promise<BusinessCollectionWithAddressDocument | undefined>;
  deleteById(id: string): Promise<void>;
  create(
    data: InsertBusinessSchema,
    tx?: Transaction
  ): Promise<BusinessCollectionDocument>;
  getAllByUserId(userId: string): Promise<BusinessCollectionDocument[] | []>;
  update(
    id: string,
    data: UpdateBusinessSchema,
    tx?: Transaction
  ): Promise<BusinessCollectionDocument>;
}
