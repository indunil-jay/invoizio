import { Transaction } from "@/drizzle";
import { CreateClientAddress } from "@/drizzle/schemas/client-address";
import { IClientAddressRepository } from "@/src/client-user/application/repositories/client-address-repository";
import { ClientAddress } from "@/src/client-user/domain/client-address.entity";
import { injectable } from "inversify";

@injectable()
export class ClientAddressRepository implements IClientAddressRepository {
    insert(
        data: CreateClientAddress,
        tx?: Transaction
    ): Promise<ClientAddress> {
        throw new Error("Method not implemented.");
    }
}
