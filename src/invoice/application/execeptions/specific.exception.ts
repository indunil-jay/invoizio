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
export class InvoiceUpdateUnauthorizedException extends UnauthorizedException {
    constructor() {
        super("You are not authorized to update an invoice for this user.");
        this.name = this.constructor.name;
    }
}

export class InvoiceNotFoundException extends AppError {
    constructor() {
        super(
            "The specified Invoice could not be found. Please verify the details and try again."
        );
        this.name = this.constructor.name;
    }
}
