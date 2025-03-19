"use server";

import { executeAction } from "@/app/_utils/execute.action";
import { updateBusinessController } from "@/src/business/presenter/controllers/update-business.controller";

export const updateBusiness = (id: string, formData: FormData) => {
    const image = formData.get("image");
    const address = formData.get("address");
    const name = formData.get("name");
    console.log({ image, address, name });

    return executeAction({
        actionFn: async () =>
            await updateBusinessController(id, {
                name: name ? name : undefined,
                image: image ? image : undefined,
                address: address ? address : undefined,
            }),
        successTitle: "Business Update Success",
        failureTitle: "Business Update Failture",
    });
};
