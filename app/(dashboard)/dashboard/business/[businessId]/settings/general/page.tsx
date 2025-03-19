"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { UpdateBusinessForm } from "@/app/(dashboard)/dashboard/business/[businessId]/settings/general/_components/update-business.from";
import { Separator } from "@/app/_components/ui/separator";
import { DeleteBusiness } from "@/app/(dashboard)/dashboard/business/_components/delete-business";
import { useParams } from "next/navigation";
import { Business, useBusinessStore } from "@/app/stores/business-store";
import { useEffect, useState } from "react";
import Spinner from "@/app/_components/custom/spinner";

export default function Page() {
    const { businessId } = useParams();
    const businesses = useBusinessStore((state) => state.businesses);
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (businessId && businesses.length > 0) {
            const foundBusiness = businesses.find((b) => b.id === businessId);
            setBusiness(foundBusiness || null);
            setLoading(false);
        }
    }, [businessId, businesses]);

    if (loading) {
        return (
            <div className="m-auto">
                <Spinner />
            </div>
        );
    }

    if (!business) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500">Business not found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-lg py-20 w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="capitalize text-xl">
                        Update your business
                    </CardTitle>
                    <CardDescription>
                        Update either the name or icon of your business to
                        reflect new changes.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <UpdateBusinessForm business={business} />
                </CardContent>

                <div className="my-7">
                    <Separator />
                </div>

                <CardHeader>
                    <CardTitle>Delete your business</CardTitle>
                    <CardDescription>
                        Please note, this action is permanent and cannot be
                        undone.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <DeleteBusiness businessId={business.id} />
                </CardContent>
            </Card>
        </div>
    );
}
