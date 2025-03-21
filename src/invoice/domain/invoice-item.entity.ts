export class InvoiceItem {
    constructor(
        public readonly id: string,
        public readonly invoiceId: string,
        public readonly name: string,
        public readonly price: number,
        public readonly quantity: number,
        public readonly taxRate: number,
        public readonly discountRate: number
    ) {}
}
