import { getAllBusinessesUseCase } from "../../application/use-cases/get-all-businesses.usecase";
import { Business } from "../../domain/business.entity";

const presenter = (businesses: Business[] | []) => {
    return JSON.parse(JSON.stringify(businesses));
};

export const getAllBusinessesController = async () => {
    const businesses = await getAllBusinessesUseCase.execute();
    return presenter(businesses);
};
