import { invoiceValidationSchema } from "@/shared/validation-schemas/invoice/invoice-validation-schema";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { createInvoiceUseCase } from "../../application/use-cases/create-invoice.usecase";

export const createInvoiceController = async (request: unknown) => {
    const { data, error } = invoiceValidationSchema.safeParse(request);
    if (error) {
        throw new BadRequestException();
    }
    await createInvoiceUseCase.execute(data);
};
