import { updateInvoiceSchema } from "@/shared/validation-schemas/invoice/update-invoice-form-schema";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { updateInvoiceUseCase } from "../../application/use-cases/update-invoice.usecase";

const presenter = () => {
    return {
        data: undefined,
        status: true,
        message:
            "Invoice has been successfully Updated. An new email has been sent to the client.",
    };
};

export const updateInvoiceController = async (request: unknown) => {
    const { data, error } = updateInvoiceSchema.safeParse(request);

    if (error) {
        throw new BadRequestException();
    }

    await updateInvoiceUseCase.execute(data);

    return presenter();
};
