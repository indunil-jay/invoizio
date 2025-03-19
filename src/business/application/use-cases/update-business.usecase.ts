import { getInjection } from "@/di/container";
import { UpdateBusinessDto } from "@/src/business/application/dtos/update-business.dto";
import {
    BusinessNotFoundException,
    BusinessUpdateUnauthorizedException,
} from "../exceptions/specific.exception";

export const updateBusinessUseCase = {
    async execute(id: string, { name, image, address }: UpdateBusinessDto) {
        const {
            authenticationService,
            businessRepository,
            businessAddressRepository,
        } = this.getServices();
        // validate  user session
        const user = await authenticationService.verifySessionUser();

        //check if business document exists
        const existingBusiness = await businessRepository.get(id);

        if (!existingBusiness) {
            throw new BusinessNotFoundException();
        }

        //check if user has permission to update
        if (existingBusiness.userId !== user.id) {
            throw new BusinessUpdateUnauthorizedException();
        }

        //if name exists update
        if (name) {
            await businessRepository.update(id, { name });
        }
        //if address exists upate
        if (address) {
            await businessAddressRepository.update(id, address);
        }
        //if image exist, remove existing one and add new

        const business = await businessRepository.get(id);
        if (!business) throw new BusinessNotFoundException();
        return business;
    },
    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            businessRepository: getInjection("IBusinessRepository"),
            businessAddressRepository: getInjection(
                "IBusinessAddressRepository"
            ),
        };
    },
};
