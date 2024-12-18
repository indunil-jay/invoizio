import {
  BusinessCollectionDocument,
  InsertBusinessSchema,
} from "@/drizzle/schemas/business";

export interface IBusinessRepository {
  getById(id: string): Promise<BusinessCollectionDocument | undefined>;
  deleteById(id: string): Promise<void>;
  create(data: InsertBusinessSchema): Promise<BusinessCollectionDocument>;
  getAllByUserId(userId: string): Promise<BusinessCollectionDocument[] | []>;
}
