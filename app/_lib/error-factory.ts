import { ConflictError } from "@/src/domain/errors/errors";
import { AuthError } from "next-auth";
import { ZodError } from "zod";

export function getErrorMessage(error: unknown): string {
  let message: string;

  if (error instanceof ZodError) {
    message = error.errors[0].message;
  } else if (error instanceof AuthError) {
    message = error.cause?.err?.message || "Unknown authorization error";
  } else if (error instanceof ConflictError) {
    message = error.message;
  } else {
    message = "Unknown error";
  }

  return message;
}
