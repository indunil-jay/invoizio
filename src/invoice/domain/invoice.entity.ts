export class Invoice {
    constructor(
        public readonly id: string,
        public readonly businessId: string,
        public readonly clientId: string,
        public readonly description: string,
        public readonly issueDate: Date,
        public readonly dueDate: Date,
        public readonly totalPrice: string,
        public readonly totalBasePrice: string,
        public readonly totalDiscount: string,
        public readonly totalTax: string,
        public readonly statusId: number
    ) {}
}
