import { Transaction } from "@/drizzle";
import {
  BusinessAddressesCollectionDocument,
  CreateBusinessAddressInput,
  PartialUpdateBusinessAddressesCollectionDocument,
} from "@/drizzle/schemas/business-address";

export interface IBusinessAddressRepository {
  create(
    data: CreateBusinessAddressInput,
    tx?: Transaction
  ): Promise<BusinessAddressesCollectionDocument>;
  update(
    businessId: string,
    data: PartialUpdateBusinessAddressesCollectionDocument,
    tx?: Transaction
  ): Promise<BusinessAddressesCollectionDocument>;
}
