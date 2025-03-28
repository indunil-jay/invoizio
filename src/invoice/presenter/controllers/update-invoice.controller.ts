import { updateInvoiceSchema } from "@/shared/validation-schemas/invoice/update-invoice-form-schema";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { updateInvoiceUseCase } from "../../application/use-cases/update-invoice.usecase";
import { inspect } from "util";

export const updateInvoiceController = async (request: unknown) => {
    const { data, error } = updateInvoiceSchema.safeParse(request);

    if (error) {
        console.log(inspect(error, { depth: null }));
        throw new BadRequestException();
    }

    await updateInvoiceUseCase.execute(data);
};
