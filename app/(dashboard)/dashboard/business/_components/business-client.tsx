"use client";

import { Business, useBusinessStore } from "@/app/stores/business-store";
import { useEffect, useState } from "react";

export interface BusinessClientProps {
    businesses: Business[];
}

export const BusinessClient = ({ businesses }: BusinessClientProps) => {
    const setBusinesses = useBusinessStore((state) => state.setBusinesses);
    const storeBusinesses = useBusinessStore((state) => state.businesses);

    useEffect(() => {
        // Only set businesses if Zustand store is empty
        if (storeBusinesses.length === 0 && businesses.length > 0) {
            setBusinesses(businesses);
        }
    }, [businesses, storeBusinesses.length, setBusinesses]);

    return null;
};
