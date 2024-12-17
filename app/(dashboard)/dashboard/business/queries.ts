import { executeQuery } from "@/app/_lib/execute.queries";
import { getAllBusinessController } from "@/src/interface-adapter/controllers/business/get-all-business.controller";

export const getAllBusiness = () => {
  return executeQuery({
    queryFn: async () => await getAllBusinessController(),
  });
};
