import { executeQuery } from "@/app/_utils/execute.queries";
import { getCurrentUserController } from "@/src/iam/presenter/controllers/get-current-user.controller";

export const getCurrentUser = () =>
    executeQuery({ queryFn: async () => await getCurrentUserController() });
