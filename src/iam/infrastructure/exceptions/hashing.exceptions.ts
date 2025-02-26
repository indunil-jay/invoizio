import { AppError } from "@/shared/utils/base.exeception";

export class HashingServiceError extends AppError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class PasswordHashException extends HashingServiceError {
    constructor() {
        super(
            "An error occurred while processing the password. Please try again later."
        );
    }
}

export class PasswordCompareException extends HashingServiceError {
    constructor() {
        super("Unable to compare passwords. Please check your credentials.");
    }
}
