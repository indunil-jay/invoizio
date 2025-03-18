import { create } from "zustand";

export type Business = {
    id: string;
    name: string;
    userId: string;
    image: {
        id: string;
        type: string;
        url: string;
        publicId: string;
        size: string;
        mimeType: string;
        businessId: string;
    };
    address: {
        id: string;
        businessId: string;
        addressLine1: string;
        city: string;
        postalCode: string;
        addressLine2?: string | null;
    };
};

export type BusinessState = {
    businesses: Business[] | [];
};

export type BusinessActions = {
    setBusinesses: (business: Business[] | []) => void;
};

export type BusinessStore = BusinessState & BusinessActions;

export const defaultInitState: BusinessState = {
    businesses: [],
};

export const useBusinessStore = create<BusinessStore>()((set) => ({
    ...defaultInitState,
    setBusinesses: (businesses: Business[] | []) =>
        set(() => ({ businesses: businesses ? [...businesses] : [] })),
}));
