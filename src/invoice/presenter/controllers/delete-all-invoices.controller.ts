import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { deleteAllInvoiceUseCase } from "@/src/invoice/application/use-cases/delete-all-invoices.usecase";

const presenter = () => {
    return {
        data: undefined,
        status: true,
        message: "All selected invoices have been successfully deleted.",
    };
};

export const deleteAllInvoiceController = async (invoiceIds: string[]) => {
    if (invoiceIds.length === 0) {
        throw new BadRequestException();
    }
    await deleteAllInvoiceUseCase.execute(invoiceIds);
    return presenter();
};
