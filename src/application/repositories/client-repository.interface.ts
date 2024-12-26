import { Transaction } from "@/drizzle";
import {
  ClientsCollectionDocument,
  CreateClientInput,
} from "@/drizzle/schemas/client";

export interface IClientRepository {
  insert(
    data: CreateClientInput,
    tx?: Transaction
  ): Promise<ClientsCollectionDocument>;
  update(
    data: CreateClientInput,
    clientId: string,
    tx?: Transaction
  ): Promise<ClientsCollectionDocument>;

  getById(clientId: string): Promise<ClientsCollectionDocument | undefined>;
}
