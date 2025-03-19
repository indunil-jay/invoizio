"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ConfirmationModal } from "@/app/_components/custom/modal";
import { Button } from "@/app/_components/ui/button";
import { deleteBusiness } from "@/app/(dashboard)/dashboard/business/[businessId]/settings/actions";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { Business, useBusinessStore } from "@/app/stores/business-store";

export const DeleteBusiness = ({ businessId }: { businessId: string }) => {
    const [showModal, setShowModal] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    const { toast } = useShowToast();
    const {
        businesses,
        setBusinesses,
        activeBusiness,
        setActiveBusiness,
        removeAllBusinesses,
    } = useBusinessStore();

    const handleClick = () => {
        setShowModal(true);
    };

    const handleConfirm = async () => {
        setIsPending(true);
        const response = await deleteBusiness(businessId);
        setIsPending(false);
        setShowModal(false);

        if (response.status) {
            // Remove the deleted business from the store
            const resetOfBusinesses = businesses.filter(
                (b) => b.id !== businessId
            );
            console.log({ resetOfBusinesses });

            // Check if active business is the one being deleted
            if (activeBusiness?.id === businessId) {
                if (resetOfBusinesses.length > 0) {
                    // Set the last business as active if there are remaining businesses
                    setActiveBusiness(
                        resetOfBusinesses[resetOfBusinesses.length - 1]
                    );

                    // Update businesses in the store after deletion
                    removeAllBusinesses();
                    setBusinesses(resetOfBusinesses);
                } else {
                    removeAllBusinesses(); // Clear businesses from the store
                    router.push("/dashboard/business/create");
                }
            }
        }
        toast(response);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="flex justify-end">
                <Button
                    onClick={handleClick}
                    size={"lg"}
                    variant={"destructive"}
                    disabled={isPending}
                >
                    Delete
                </Button>
            </div>

            <ConfirmationModal
                message="Are you sure you want to delete your business? This action will permanently remove all related data, including transactions and pending actions. This cannot be undone."
                isOpen={showModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                isPending={isPending}
            />
        </>
    );
};
