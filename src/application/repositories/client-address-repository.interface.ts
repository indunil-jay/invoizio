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
  update(
    data: CreateClientAddressInput,
    clientId: string,
    tx?: Transaction
  ): Promise<ClientAddressesCollectionDocument>;
  getById(
    clientId: string
  ): Promise<ClientAddressesCollectionDocument | undefined>;
}
