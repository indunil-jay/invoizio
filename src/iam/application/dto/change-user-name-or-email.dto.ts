import { changeUserNameOrEmailFormSchema } from "@/shared/validation-schemas/account/change-user-name-or-email-form.schema";
import { z } from "zod";

export type changeNameOrEmailDto = z.infer<
    typeof changeUserNameOrEmailFormSchema
>;
