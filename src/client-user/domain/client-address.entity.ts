export class ClientAddress {
    constructor(
        public readonly id: string,
        public readonly clientId: string,
        public readonly addressLine1: string,
        public readonly city: string,
        public readonly postalCode: string,
        public readonly addressLine2?: string | null
    ) {}
}
