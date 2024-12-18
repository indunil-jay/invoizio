"use client";
import { ConfirmationModal } from "@/app/_components/custom/modal";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { deleteBusinessById } from "../[businessId]/settings/actions";
import { useShowToast } from "@/app/_hooks/custom/use-toast-message";
import { useRouter } from "next/navigation";

export const DeleteBusiness = ({ businessId }: { businessId: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const toast = useShowToast();

  // Handle button click to show the confirmation modal
  const handleClick = () => {
    setShowModal(true);
  };

  // Handle confirmation of deletion
  const handleConfirm = async () => {
    setIsPending(true);
    const response = await deleteBusinessById(businessId);
    if (response) {
      toast(response);
    }
    setIsPending(false);
    setShowModal(false);
    router.refresh();
  };

  // Handle canceling the deletion
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
      />
    </>
  );
};
