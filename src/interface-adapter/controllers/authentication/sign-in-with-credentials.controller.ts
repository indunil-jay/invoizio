import {
  SignInUserRequestDTO,
  signInUserSchema,
} from "@/src/application/dtos/user.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { signInWithCredentialsUseCase } from "@/src/application/use-cases/sign-in-with-credentials.use-case";

export const signInWithCredentialsController = async (
  input: SignInUserRequestDTO
) => {
  const { error: inputParseError, data } = signInUserSchema.safeParse(input);

  if (inputParseError) {
    throw new BadRequestError("signIn parse error");
  }

  return await signInWithCredentialsUseCase.execute(data);
};
