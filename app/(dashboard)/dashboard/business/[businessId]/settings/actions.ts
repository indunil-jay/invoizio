"use server";
import { executeAction } from "@/app/_utils/execute.action";
import { updateBusinessFormSchema } from "@/shared/validation-schemas/business/update-business-form-schema";
import { updateBusinessController } from "@/src/business/presenter/controllers/update-business.controller";
import { z } from "zod";

// export const deleteBusinessById = (id: string) => {
//     return executeAction({
//         actionFn: async () => await deleteBusinessByIdController(id),
//         title: "Delete Business",
//     });
// };

export const updateBusiness = (
    id: string,
    values: z.infer<typeof updateBusinessFormSchema>
) => {
    return executeAction({
        actionFn: async () => await updateBusinessController(id, values),
        successTitle: "Business Update Success",
        failureTitle: "Business Update Failture",
    });
};
