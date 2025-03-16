"use server";
import { z } from "zod";
import { executeAction } from "@/app/_utils/execute.action";
import { changePasswordFormSchema } from "@/shared/validation-schemas/account/change-password-form-schema";
import { changeUserNameOrEmailFormSchema } from "@/shared/validation-schemas/account/change-user-name-or-email-form.schema";
import { changePasswordController } from "@/src/iam/presenter/controllers/change-password.controller";
import { changeUserNameOrEmailController } from "@/src/iam/presenter/controllers/change-user-name-or-email.controller";
import { uploadCoverImageController } from "@/src/iam/presenter/controllers/upload-cover-image.controller";
import { uploadProfilePictureController } from "@/src/iam/presenter/controllers/upload-profile-picture.controller";

export const changePassword = (
    values: z.infer<typeof changePasswordFormSchema>
) =>
    executeAction({
        actionFn: async () => await changePasswordController(values),
        successTitle: "Password change success",
        failureTitle: "password change failed",
    });

export const updateProfile = (
    values: z.infer<typeof changeUserNameOrEmailFormSchema>
) => {
    return executeAction({
        actionFn: async () => await changeUserNameOrEmailController(values),
        successTitle: "Proifle Update Success",
        failureTitle: "Profile Update Failed",
    });
};

export const uploadCoverImage = (formData: FormData) => {
    const image = formData.get("image") as File | null;
    return executeAction({
        actionFn: async () => await uploadCoverImageController({ image }),
        successTitle: "Cover Image Uploaded Success",
        failureTitle: "Cover Image Uploaded Failed",
    });
};
export const changeProfileImage = (formData: FormData) => {
    const image = formData.get("image") as File | null;
    return executeAction({
        actionFn: async () => await uploadProfilePictureController({ image }),
        successTitle: "Profile Picture Uploaded Success",
        failureTitle: "Profile Picture Uploaded Failed",
    });
};
