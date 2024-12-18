import { getAllBusinessUseCase } from "@/src/application/use-cases/business/get-all-business.use-case";

export const getAllBusinessController = async () => {
  return await getAllBusinessUseCase.execute();
};
