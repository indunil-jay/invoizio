import { AppError } from "@/shared/utils/base.exeception";

export class EmailSendingException extends AppError {
    constructor(
        message: string = "Your verification email failed to send. Please try again or contact support."
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}
