import { SignUpInput, signUpSchema } from "@/drizzle/schemas/user";
import { signUpUseCase } from "@/src/application/use-cases/sign-up.usecase";

export const signUpController = async (input: SignUpInput) => {
  const { error: inputParseError } = signUpSchema.safeParse(input);

  if (inputParseError) {
    throw new Error("signup parse error");
  }

  await signUpUseCase.execute(input);
};
