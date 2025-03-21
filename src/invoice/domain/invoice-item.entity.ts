export class InvoiceItem {
    constructor(
        public readonly id: string,
        public readonly invoiceId: string,
        public readonly name: string,
        public readonly price: string,
        public readonly quantity: number,
        public readonly taxRate: string | null,
        public readonly discountRate: string | null
    ) {}
}
