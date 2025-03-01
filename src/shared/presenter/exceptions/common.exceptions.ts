import { AppError } from "@/shared/utils/base.exeception";

export class BadRequestException extends AppError {
    constructor(
        message: string = "The request is invalid. Please check the input data."
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}
