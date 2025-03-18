export class BusinessAddress {
    constructor(
        public readonly id: string,
        public readonly businessId: string,
        public readonly addressLine1: string,
        public readonly city: string,
        public readonly postalCode: string,
        public readonly addressLine2?: string | null
    ) {}
}
