import { deleteBusinessByIdUseCase } from "@/src/application/use-cases/business/delete-business.-by-id.use-case";

export const deleteBusinessByIdController = async (id: string) => {
  return await deleteBusinessByIdUseCase.execute(id);
};
