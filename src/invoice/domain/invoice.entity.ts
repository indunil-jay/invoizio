export class Invoice {
    private _lastEmailSentAt?: Date | null;

    constructor(
        public readonly id: string,
        public readonly businessId: string,
        public readonly clientId: string,
        public readonly description: string,
        public readonly issueDate: Date,
        public readonly dueDate: Date,
        public readonly totalPrice: string,
        public readonly totalBasePrice: string,
        public readonly totalDiscount: string | null,
        public readonly totalTax: string | null,
        public readonly statusId: number
    ) {}

    public setLastEmailSent(date: Date) {
        this._lastEmailSentAt = date;
    }

    public get lastEmailSentAt() {
        return this._lastEmailSentAt;
    }
}
