import {
  SignInInput,
  strictSignInWithCredentialSchema,
} from "@/drizzle/schemas/user";
import { BadRequestError } from "@/src/application/errors/errors";
import { signInWithCredentialsUseCase } from "@/src/application/use-cases/sign-in-with-credentials.use-case";

export const signInWithCredentialsController = async (input: SignInInput) => {
  const { error: inputParseError, data } =
    strictSignInWithCredentialSchema.safeParse(input);

  if (inputParseError) {
    throw new BadRequestError("signIn parse error");
  }

  return await signInWithCredentialsUseCase.execute(data);
};
