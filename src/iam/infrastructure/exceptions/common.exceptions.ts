import { AppError } from "@/shared/utils/base.exeception";

export class DataBaseException extends AppError {
    constructor(
        message: string = "Something went wrong. Our team has been notified and is working to resolve the issue. Please try again later."
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}
