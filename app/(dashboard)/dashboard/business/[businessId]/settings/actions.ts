"use server";
import { z } from "zod";
import { executeAction } from "@/app/_utils/execute.action";
import { updateBusinessFormSchema } from "@/shared/validation-schemas/business/update-business-form-schema";
import { updateBusinessController } from "@/src/business/presenter/controllers/update-business.controller";

export const updateBusiness = (
    id: string,
    values: z.infer<typeof updateBusinessFormSchema>
) => {
    console.log({ values });
    return executeAction({
        actionFn: async () => await updateBusinessController(id, values),
        successTitle: "Business Update Success",
        failureTitle: "Business Update Failture",
    });
};
