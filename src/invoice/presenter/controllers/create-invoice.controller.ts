import { createInvoiceSchema } from "@/shared/validation-schemas/invoice/create-invoice-form-schema";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";

export const createInvoiceController = async (request: unknown) => {
    const { data, error } = createInvoiceSchema.safeParse(request);
    if (error) {
        throw new BadRequestException();
    }
    console.log({ data });
};
