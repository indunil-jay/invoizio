import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { updateInvoiceStatusUseCase } from "../../application/use-cases/update-invoice-status.usecase";

const presenter = () => {
    return {
        status: true,
        data: undefined,
        message: "Invoice status has been successfully updated.",
    };
};

export const updateInvoiceStatusController = async (
    invoiceId: string,
    statusId: number
) => {
    if (!invoiceId || !statusId) {
        throw new BadRequestException();
    }
    await updateInvoiceStatusUseCase.execute(invoiceId, statusId);
    return presenter();
};
