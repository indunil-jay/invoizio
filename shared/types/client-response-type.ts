export type ClientType = {
    id: string;
    name: string;
    email: string;
    address: {
        id: string;
        clientId: string;
        addressLine1: string;
        city: string;
        postalCode: string;
        addressLine2?: string | null;
    };
};
