import { AppError } from "@/shared/utils/base.exeception";

export class InvalidSession extends AppError {
    constructor() {
        super(
            `Session is invalid or expired.", "Your session has expired. Please log in again.`
        );
        this.name = this.constructor.name;
    }
}

export class UnauthorizedException extends AppError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class InvalidSessionException extends UnauthorizedException {
    constructor() {
        super(
            "Your session is invalid or has expired. Please log in again to continue."
        );
        this.name = this.constructor.name;
    }
}
export class InvalidSessionUserException extends UnauthorizedException {
    constructor() {
        super(
            "We couldn't find your user account. Please log in and try again."
        );
        this.name = this.constructor.name;
    }
}
