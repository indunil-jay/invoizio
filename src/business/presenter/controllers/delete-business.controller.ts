import { deleteBusinessUseCase } from "@/src/business/application/use-cases/delete-business.usecase";

const presenter = () => {
    return {
        message: "The business has been successfully deleted.",
        status: true,
        data: undefined,
    };
};

export const deleteBusinessController = async (id: string) => {
    await deleteBusinessUseCase.execute(id);
    return presenter();
};
