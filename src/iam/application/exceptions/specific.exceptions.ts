import { AppError } from "@/shared/utils/base.exeception";

export class EmailAlreadyExistsException extends AppError {
    constructor() {
        super(
            "The email address is already in use. Please try a different email."
        );
        this.name = this.constructor.name;
    }
}
