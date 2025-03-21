import { ClientAddress } from "./client-address.entity";

export class Client {
    private _address?: ClientAddress;
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string
    ) {}

    public setAddress(clientAddress: ClientAddress) {
        this._address = clientAddress;
    }

    public get address(): ClientAddress | undefined {
        return this._address;
    }
}
