import { AppError } from "@/shared/utils/base.exeception";

export class BusinessNotFoundException extends AppError {
    constructor() {
        super("The requested business was not found.");
        this.name = this.constructor.name;
    }
}
