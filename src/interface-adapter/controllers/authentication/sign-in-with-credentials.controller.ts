import {
  SignInInput,
  strictSignInWithCredentialSchema,
} from "@/drizzle/schemas/user";
import { signInWithCredentialsUseCase } from "@/src/application/use-cases/sign-in-with-credentials.use-case";

export const signInWithCredentialsController = async (input: SignInInput) => {
  const { error: inputParseError, data } =
    strictSignInWithCredentialSchema.safeParse(input);

  if (inputParseError) {
    throw new Error("signIn parse error");
  }

  await signInWithCredentialsUseCase.execute(data);
};
