import { executeQuery } from "@/app/_lib/execute.queries";
import { getUserByIdController } from "@/src/interface-adapter/controllers/user/get-user-by-id.controller";

export const getUserById = (id: string) => {
  return executeQuery({
    queryFn: async () => await getUserByIdController(id),
  });
};
