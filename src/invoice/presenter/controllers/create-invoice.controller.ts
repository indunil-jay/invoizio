import { invoiceValidationSchema } from "@/shared/validation-schemas/invoice/invoice-validation-schema";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { createInvoiceUseCase } from "../../application/use-cases/create-invoice.usecase";

const presenter = () => {
    return {
        data: undefined,
        status: true,
        message:
            "Invoice has been successfully created. An email has been sent to the client.",
    };
};

export const createInvoiceController = async (request: unknown) => {
    const { data, error } = invoiceValidationSchema.safeParse(request);
    if (error) {
        throw new BadRequestException();
    }
    await createInvoiceUseCase.execute(data);
    return presenter();
};
