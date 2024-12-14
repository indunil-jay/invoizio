import { forgotPasswordUseCase } from "@/src/application/use-cases/forgot-password.use-case";
import {
  PasswordResetInput,
  passwordResetInputSchema,
} from "@/src/interface-adapter/validation-schemas/password-reset-input.schema";

export const forgotPasswordController = async (values: PasswordResetInput) => {
  const { data, error: inputParseError } =
    passwordResetInputSchema.safeParse(values);

  if (inputParseError) {
    throw new Error("password reset email parse error");
  }

  await forgotPasswordUseCase(data.email);
};
