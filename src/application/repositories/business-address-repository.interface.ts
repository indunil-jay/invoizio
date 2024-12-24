import { Transaction } from "@/drizzle";
import {
  BusinessAddressesCollectionDocument,
  CreateBusinessAddressInput,
} from "@/drizzle/schemas/business-address";

export interface IBusinessAddressRepository {
  create(
    data: CreateBusinessAddressInput,
    tx?: Transaction
  ): Promise<BusinessAddressesCollectionDocument>;
}
