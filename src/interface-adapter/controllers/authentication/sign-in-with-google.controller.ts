import { signInWithGoogleUseCase } from "@/src/application/use-cases/authentication/sign-in-with-google.use-case";

export const signInWithGoogleController = async () => {
  return await signInWithGoogleUseCase.execute();
};
