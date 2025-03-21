export class Invoice {
    constructor(
        public readonly id: string,
        public readonly businessId: string,
        public readonly clientId: string,
        public readonly description: string,
        public readonly issueDate: Date,
        public readonly dueDate: Date,
        public readonly totalPrice: number,
        public readonly totalBasePrice: number,
        public readonly totalDiscount: number,
        public readonly totalTax: number,
        public readonly statusId: number
    ) {}
}
