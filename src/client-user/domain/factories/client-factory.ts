import { randomUUID } from "crypto";
import { Client } from "@/src/client-user/domain/client.entity";
import { injectable } from "inversify";

export interface IClientFactory {
    create(name: string, email: string): Client;
}

@injectable()
export class ClientFactory implements IClientFactory {
    create(name: string, email: string) {
        const clientId = randomUUID();
        return new Client(clientId, name, email);
    }
}
