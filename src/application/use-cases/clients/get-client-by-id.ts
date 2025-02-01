import { getInjection } from "@/di/container";

export const getClientByIdUseCase = {
    async execute(clientId: string) {
        const clientRepository = getInjection("IClientRepository");
        const client = await clientRepository.getById(clientId);

        return client;
    },
};
