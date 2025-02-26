import { getUserByIdUseCase } from "@/src/application/use-cases/user/get-user-by-id.use-case";
import {
    presenter,
    UserResponse,
} from "@/src/presenter/presenters/user/get-user-by-id.presenter";

export const getUserByIdController = async (
    id: string
): Promise<UserResponse> => {
    return presenter(await getUserByIdUseCase.execute(id));
};
