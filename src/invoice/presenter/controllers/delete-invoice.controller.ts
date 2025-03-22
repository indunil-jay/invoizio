import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { deleteInvoiceUseCase } from "@/src/invoice/application/use-cases/delete-invoice.usecase";

const presenter = () => {
    return {
        message: "The invoice has been successfully deleted.",
        data: undefined,
        status: true,
    };
};

export const deleteInvoiceController = async (invoiceId: string) => {
    if (!invoiceId || typeof invoiceId !== "string") {
        throw new BadRequestException();
    }
    await deleteInvoiceUseCase.execute(invoiceId);
    return presenter();
};
