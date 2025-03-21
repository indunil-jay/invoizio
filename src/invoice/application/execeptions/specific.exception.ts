import { AppError } from "@/shared/utils/base.exeception";

export class UnauthorizedException extends AppError {
    constructor(message?: string) {
        super(message || "unauthorized");
        this.name = this.constructor.name;
    }
}

export class InvoiceCreateUnauthorizedException extends UnauthorizedException {
    constructor() {
        super("You are not authorized to create an invoice for this user.");
        this.name = this.constructor.name;
    }
}
