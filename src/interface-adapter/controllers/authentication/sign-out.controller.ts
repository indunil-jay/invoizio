import { signOutUseCase } from "@/src/application/use-cases/authentication/sign-out.use-case";

export const signOutController = async () => {
  await signOutUseCase.execute();
};
