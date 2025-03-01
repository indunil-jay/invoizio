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

export class EmailVerificationAlreadySentException extends AppError {
    constructor() {
        super(
            "Your email is not verified. A verification link has been already sent to your inbox. Please check your email."
        );
        this.name = this.constructor.name;
    }
}

class AuthenticationException extends AppError {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidCredentialException extends AuthenticationException {
    constructor() {
        super(
            "Invalid credentials. Please check your email and password and try again."
        );
        this.name = this.constructor.name;
    }
}
export class InvalidPasswordException extends AuthenticationException {
    constructor() {
        super(
            "Incorrect password. Please ensure it's the correct password and try again."
        );
        this.name = this.constructor.name;
    }
}
export class NotSignedUpException extends AuthenticationException {
    constructor() {
        super("You are not signed up. Please sign up first");
        this.name = this.constructor.name;
    }
}
export class InvalidPasswordResetTokenException extends AuthenticationException {
    constructor() {
        super(
            "The provided token is invalid or has already been used. Please request a new password reset link."
        );
        this.name = this.constructor.name;
    }
}
export class ExpiredPasswordResetTokenException extends AuthenticationException {
    constructor() {
        super(
            "The password reset token has expired. Please request a new link to reset your password."
        );
        this.name = this.constructor.name;
    }
}

export class PasswordResetProcessException extends AppError {
    constructor() {
        super(
            "There was an issue while reseting password. Please try again later. If the problem persists, contact support for assistance."
        );
        this.name = this.constructor.name;
    }
}

export class IncorrectPasswordException extends AppError {
    constructor() {
        super(
            "The current password you entered is incorrect. Please try again."
        );
        this.name = this.constructor.name;
    }
}

export class EmailAlreadyInUseException extends AppError {
    constructor() {
        super(
            "This email is your current address. Please use a different one."
        );
        this.name = this.constructor.name;
    }
}

export class DuplicateEmailException extends AppError {
    constructor() {
        super(
            "The requested email is already in use. Please delete the existing account or provide a different email."
        );
        this.name = this.constructor.name;
    }
}
