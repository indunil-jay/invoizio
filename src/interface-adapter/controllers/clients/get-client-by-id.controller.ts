import { BadRequestError } from "@/src/application/errors/errors";
import { getClientByIdUseCase } from "@/src/application/use-cases/clients/get-client-by-id";
import { presenter } from "../../presenters/clients/get-client-by-id.presenter";

export const getClientByIdController = async (clientId: string) => {
    if (!clientId) {
        throw new BadRequestError(
            "The client ID is required. Please provide a valid ID."
        );
    }
    const client = await getClientByIdUseCase.execute(clientId);
    return presenter(client!);
};
