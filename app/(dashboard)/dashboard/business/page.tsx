"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBusinessStore } from "@/app/stores/business-store";

export default function Page() {
    const router = useRouter();
    const businesses = useBusinessStore((state) => state.businesses);

    useEffect(() => {
        if (businesses.length === 0) {
            router.replace("/dashboard/business/create");
        } else {
            router.replace(
                `/dashboard/business/${businesses[businesses.length - 1].id}/invoices`
            );
        }
    }, [businesses, router]);

    return <div>Loading...</div>;
}
