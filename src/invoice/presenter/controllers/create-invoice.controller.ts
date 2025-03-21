import { invoiceValidationSchema } from "@/shared/validation-schemas/invoice/invoice-validation-schema";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { createInvoiceUseCase } from "../../application/use-cases/create-invoice.usecase";
import { Invoice } from "../../domain/invoice.entity";

const presenter = (invoice: Invoice) => {
    return {
        data: JSON.stringify(invoice),
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
    const invoice = await createInvoiceUseCase.execute(data);
    return presenter(invoice);
};
