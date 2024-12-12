import { signInWithGoogleUseCase } from "@/src/application/use-cases/sign-in-with-google.use-case";

export const signInWithGoogleController = async () => {
  return await signInWithGoogleUseCase.execute();
};
