import { AppError } from "@/shared/utils/base.exeception";

export class BusinessNotFoundException extends AppError {
    constructor() {
        super(
            "The specified business could not be found. Please verify the details and try again."
        );
        this.name = this.constructor.name;
    }
}

export class UnauthorizedException extends AppError {
    constructor(message?: string) {
        super(message || "unauthorized");
        this.name = this.constructor.name;
    }
}

export class BusinessUpdateUnauthorizedException extends UnauthorizedException {
    constructor() {
        super("You do not have permission to update this business.");
        this.name = this.constructor.name;
    }
}
