import { ClientsCollectionWithAddressDocument } from "@/drizzle/schemas/client";

export const presenter = (
    clientDocuemnt: ClientsCollectionWithAddressDocument
) => {
    return {
        id: clientDocuemnt.id!,
        email: clientDocuemnt.email!,
        name: clientDocuemnt.name,
        address: {
            addressLine1: clientDocuemnt.clientAddresses[0].addressLine1,
            addressLine2: clientDocuemnt.clientAddresses[0].addressLine2,
            city: clientDocuemnt.clientAddresses[0].city,
            postalCode: clientDocuemnt.clientAddresses[0].postalCode,
            createdAt: clientDocuemnt.clientAddresses[0].createdAt,
            updatedAt: clientDocuemnt.clientAddresses[0].updatedAt,
        },
    };
};

export type UserResponse = ReturnType<typeof presenter>;
