import { AppError } from "@/shared/utils/base.exeception";

export class DatabaseUserUpdateException extends AppError {
    constructor() {
        super(`User update failed: No matching user found`);
        this.name = this.constructor.name;
    }
}
