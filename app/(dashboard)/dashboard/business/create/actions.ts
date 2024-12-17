"use server";
import { executeAction } from "@/app/_lib/execute.action";
import { createNewBusinessController } from "@/src/interface-adapter/controllers/business/create-new-business.controller";
import { createBusinessFormSchema } from "../_components/create-business-form";
import { z } from "zod";

export const createNewBusiness = (
  values: z.infer<typeof createBusinessFormSchema>
) => {
  return executeAction({
    actionFn: async () => await createNewBusinessController(values),
    title: "Create New Business",
  });
};
