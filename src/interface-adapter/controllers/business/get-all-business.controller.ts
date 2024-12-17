import { getAllBusinessUseCase } from "@/src/application/use-cases/business/get-all-business.use-case";

export const getAllBusinessController = async () => {
  const business = await getAllBusinessUseCase.execute();

  console.log({ business });

  return business;
};
