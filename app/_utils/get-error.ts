import { AppError } from "@/shared/utils/base.exeception";
import { AuthError } from "next-auth";

export const getErrorMessage = (error: unknown) => {
    let message: string;
    let status: boolean = false;
    console.log({ error });
    if (error instanceof AppError) {
        message = error.message;
        status = error.status;
    } else if (error instanceof AuthError) {
        message = error.cause?.err?.message || "Unknown authorization error";
    } else {
        message = "Unknown error";
    }

    return {
        message,
        status,
    };
};
