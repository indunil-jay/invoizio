import { getInjection } from "@/di/container";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";
import { InvoiceCreateUnauthorizedException } from "../execeptions/specific.exception";
import { BusinessNotFoundException } from "@/src/business/application/exceptions/specific.exception";

export const createInvoiceUseCase = {
    async execute({
        user: requestedUser,
        client,
        business,
        invoice,
        invoiceItems,
    }: CreateInvoiceDto) {
        const { authenticationService, businessRepository } =
            this.getServices();
        // verify the user
        const user = await authenticationService.verifySessionUser();

        // Ensure the session user matches the submitted data
        if (user.id !== requestedUser.id) {
            throw new InvoiceCreateUnauthorizedException();
        }

        // Verify that the specified business exists
        const existingBusiness = await businessRepository.get(business.id);

        if (!existingBusiness) {
            throw new BusinessNotFoundException();
        }
    },
    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            businessRepository: getInjection("IBusinessRepository"),
        };
    },
};
