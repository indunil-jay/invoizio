import { Transaction } from "@/drizzle";
import {
  ClientAddressesCollectionDocument,
  CreateClientAddressInput,
} from "@/drizzle/schemas/client-address";

export interface IClientAddressRepository {
  insert(
    data: CreateClientAddressInput,
    tx?: Transaction
  ): Promise<ClientAddressesCollectionDocument>;
}