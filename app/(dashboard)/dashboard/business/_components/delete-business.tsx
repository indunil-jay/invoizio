"use client";
import { ConfirmationModal } from "@/app/_components/custom/modal";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";

export const DeleteBusiness = () => {
  const [showModal, setShowModal] = useState(false);

  // Handle button click to show the confirmation modal
  const handleClick = () => {
    setShowModal(true);
  };

  // Handle confirmation of deletion
  const handleConfirm = () => {
    // logic...
    console.log("Business deleted");
    setShowModal(false);
  };

  // Handle canceling the deletion
  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleClick} size={"lg"} variant={"destructive"}>
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
