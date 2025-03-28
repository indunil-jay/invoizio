import { AppError } from "@/shared/utils/base.exeception";

export class ClientNotFoundException extends AppError {
    constructor() {
        super(
            "The specified client could not be found. Please verify the details and try again."
        );
        this.name = this.constructor.name;
    }
}
