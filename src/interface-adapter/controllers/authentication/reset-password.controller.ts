import { resetPasswordUseCase } from "@/src/application/use-cases/reset-password.use-case";
import {
  NewPasswordInput,
  newPasswordInputSchema,
} from "@/src/interface-adapter/validation-schemas/password-reset-input.schema";

export const resetPasswordController = async (
  input: NewPasswordInput,
  token: string | null
) => {
  if (!token) {
    throw new Error("Missing Token");
  }
  const { data, error: inputParseError } =
    newPasswordInputSchema.safeParse(input);

  if (inputParseError) {
    throw new Error("reset password parse error");
  }

  await resetPasswordUseCase(data.password, token);
};
