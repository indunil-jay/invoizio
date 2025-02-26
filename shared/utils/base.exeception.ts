export class AppError extends Error {
    constructor(message: string, public status: boolean = false) {
        super(message);
        this.name = this.constructor.name;
    }
}
