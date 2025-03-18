import { randomUUID } from "crypto";
import { injectable } from "inversify";
import { BusinessAddress } from "../business-address.entity";

export interface IBusinessAddressFactory {
    create(
        businessId: string,
        addressLine1: string,
        city: string,
        postalCode: string,
        addressLine2?: string
    ): BusinessAddress;
}

@injectable()
export class BusinessAddressFactory implements IBusinessAddressFactory {
    create(
        businessId: string,
        addressLine1: string,
        city: string,
        postalCode: string,
        addressLine2?: string
    ) {
        const id = randomUUID();

        return new BusinessAddress(
            id,
            businessId,
            addressLine1,
            city,
            postalCode,
            addressLine2
        );
    }
}
