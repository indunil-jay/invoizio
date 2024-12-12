import { signOutUseCase } from "@/src/application/use-cases/sign-out.use-case";

export const signOutController = async () => {
  await signOutUseCase.execute();
};
