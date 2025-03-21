import { randomUUID } from "crypto";
import { injectable } from "inversify";
import { ClientAddress } from "@/src/client-user/domain/client-address.entity";

export interface IClientAddressFactory {
    create(
        clientId: string,
        addressLine1: string,
        city: string,
        postalCode: string,
        addressLine2?: string | null
    ): ClientAddress;
}

@injectable()
export class ClientAddressFactory implements IClientAddressFactory {
    create(
        clientId: string,
        addressLine1: string,
        city: string,
        postalCode: string,
        addressLine2?: string
    ) {
        const id = randomUUID();

        return new ClientAddress(
            id,
            clientId,
            addressLine1,
            city,
            postalCode,
            addressLine2
        );
    }
}
