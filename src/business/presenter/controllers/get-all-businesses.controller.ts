import { getAllBusinessesUseCase } from "../../application/use-cases/get-all-businesses.usecase";

export const getAllBusinessesController = async () => {
    return await getAllBusinessesUseCase.execute();
};
