import { executeQuery } from "@/app/_lib/execute.queries";
import { getUserByIdController } from "@/src/presenter/controllers/user/get-user-by-id.controller";

export const getUserById = (id: string) => {
    return executeQuery({
        queryFn: async () => await getUserByIdController(id),
    });
};
