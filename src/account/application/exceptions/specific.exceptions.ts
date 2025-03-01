import { AppError } from "@/shared/utils/base.exeception";

export class IncorrectPasswordException extends AppError {
    constructor() {
        super(
            "The current password you entered is incorrect. Please try again."
        );
        this.name = this.constructor.name;
    }
}
