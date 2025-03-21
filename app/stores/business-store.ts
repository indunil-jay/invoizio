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
    activeBusiness: Business | null;
};

export const defaultInitState: BusinessState = {
    businesses: [],
    activeBusiness: null,
};

export type BusinessActions = {
    setBusinesses: (business: Business[] | []) => void;
    addBusiness: (business: Business) => void;
    updateBusiness: (updatedBusiness: Business) => void;
    getBusinessById: (id: string) => Business | undefined;
    setActiveBusiness: (business: Business | null) => void;
    removeAllBusinesses: () => void;
};

export type BusinessStore = BusinessState & BusinessActions;

export const useBusinessStore = create<BusinessStore>()((set, get) => ({
    ...defaultInitState,
    setBusinesses: (businesses: Business[] | []) => {
        set(() => ({
            businesses: [...businesses],
        }));

        const currentActiveBusiness = get().activeBusiness;
        const newActiveBusiness =
            businesses.length > 0 ? businesses[businesses.length - 1] : null;

        if (
            !currentActiveBusiness ||
            !businesses.find((b) => b.id === currentActiveBusiness.id)
        ) {
            set({ activeBusiness: newActiveBusiness });
        }
    },
    addBusiness: (business) => {
        set((state) => ({
            businesses: [...state.businesses, business],
        }));
        set({ activeBusiness: business });
    },

    updateBusiness: (updatedBusiness: Business) =>
        set((state) => {
            const updatedBusinesses = state.businesses.map((business) =>
                business.id === updatedBusiness.id ? updatedBusiness : business
            );

            return {
                businesses: updatedBusinesses,
                activeBusiness:
                    state.activeBusiness?.id === updatedBusiness.id
                        ? updatedBusiness
                        : state.activeBusiness,
            };
        }),

    getBusinessById: (id: string) => {
        const business = get().businesses.find(
            (business) => business.id === id
        );

        return business;
    },
    setActiveBusiness: (business: Business | null) => {
        set({ activeBusiness: business });
    },

    removeAllBusinesses: () => {
        set({
            businesses: [],
            activeBusiness: null,
        });
    },
}));
