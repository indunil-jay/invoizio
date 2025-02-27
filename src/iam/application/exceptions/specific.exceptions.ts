import { AppError } from "@/shared/utils/base.exeception";

export class EmailAlreadyExistsException extends AppError {
    constructor() {
        super(
            "The email address is already in use. Please try a different email."
        );
        this.name = this.constructor.name;
    }
}
export class UserNotFoundException extends AppError {
    constructor(email: string) {
        super(
            `No user found associated with the email address: "${email}". Please ensure the email is correct.`
        );
        this.name = this.constructor.name;
    }
}

export class InvalidVerificationTokenException extends AppError {
    constructor() {
        super(
            "The provided token is invalid or does not exist. Please ensure the token is correct and try again."
        );
        this.name = this.constructor.name;
    }
}
export class VerificationTokenExpiresException extends AppError {
    constructor() {
        super(
            "The verification token has expired. Please request a new verification link to proceed."
        );
        this.name = this.constructor.name;
    }
}
export class EmailVerificationProcessException extends AppError {
    constructor() {
        super(
            "There was an issue verifying your email. Please try again later. If the problem persists, contact support for assistance."
        );
        this.name = this.constructor.name;
    }
}
