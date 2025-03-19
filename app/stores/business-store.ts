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
    setActiveBusiness: (business: Business) => void;
};

export type BusinessStore = BusinessState & BusinessActions;

export const useBusinessStore = create<BusinessStore>()((set, get) => ({
    ...defaultInitState,
    setBusinesses: (businesses: Business[] | []) => {
        set(() => ({ businesses: businesses ? [...businesses] : [] }));
        // Set the last business as active if no active business is set
        if (businesses.length > 0 && !get().activeBusiness) {
            set({ activeBusiness: businesses[businesses.length - 1] });
        }
    },
    addBusiness: (business) =>
        set((state) => ({
            businesses: [...state.businesses, business],
        })),
    updateBusiness: (updatedBusiness: Business) => {
        set((state) => {
            if (state.activeBusiness?.id === updatedBusiness.id) {
                set({ activeBusiness: updatedBusiness });
            }

            return {
                businesses: state.businesses.map((business) =>
                    business.id === updatedBusiness.id
                        ? updatedBusiness
                        : business
                ),
            };
        });
    },

    getBusinessById: (id: string) => {
        return get().businesses.find((business) => business.id === id);
    },
    setActiveBusiness: (business: Business) => {
        set({ activeBusiness: business });
    },
}));
