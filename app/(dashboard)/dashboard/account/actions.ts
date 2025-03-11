"use server";
import { executeAction } from "@/app/_utils/execute.action";
import { changePasswordFormSchema } from "@/shared/validation-schemas/account/change-password-form-schema";
import { changeUserNameOrEmailFormSchema } from "@/shared/validation-schemas/account/change-user-name-or-email-form.schema";
import { updateCoverPhotoFormSchema } from "@/shared/validation-schemas/account/update-cover-photo-form-schema";
import { changePasswordController } from "@/src/iam/presenter/controllers/change-password.controller";
import { changeUserNameOrEmailController } from "@/src/iam/presenter/controllers/change-user-name-or-email.controller";
import { uploadCoverImageController } from "@/src/iam/presenter/controllers/upload-cover-image.controller";
import { z } from "zod";

export const changePassword = async (
    values: z.infer<typeof changePasswordFormSchema>
) =>
    executeAction({
        actionFn: async () => await changePasswordController(values),
        successTitle: "Password change success",
        failureTitle: "password change failed",
    });

export const updateProfile = async (
    values: z.infer<typeof changeUserNameOrEmailFormSchema>
) => {
    return executeAction({
        actionFn: async () => await changeUserNameOrEmailController(values),
        successTitle: "Proifle Update Success",
        failureTitle: "Profile Update Failed",
    });
};

export const uploadCoverImage = async (formData: FormData) => {
    const image = formData.get("image") as File | null;
    return executeAction({
        actionFn: async () => await uploadCoverImageController({ image }),
        successTitle: "Cover Image Uploaded Success",
        failureTitle: "Cover Image Uploaded Failed",
    });
};
