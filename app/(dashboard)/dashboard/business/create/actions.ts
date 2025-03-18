"use server";
import { executeAction } from "@/app/_utils/execute.action";
import { createNewBusinessController } from "@/src/business/presenter/controllers/create-new-business.controller";

export const createNewBusiness = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const image = formData.get("image") as File | null;

    const address = {
        addressLine1: formData.get("address[addressLine1]") as string,
        addressLine2: formData.get("address[addressLine2]") as string | null,
        city: formData.get("address[city]") as string,
        postalCode: formData.get("address[postalCode]") as string,
    };
    return executeAction({
        actionFn: async () =>
            await createNewBusinessController({ name, image, address }),
        successTitle: "Business Profile Creation Success",
        failureTitle: "Business Profile Creation Failed",
    });
};
