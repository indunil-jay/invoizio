"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { deleteInvoiceById } from "../actions";
import { useShowToast } from "@/app/_hooks/custom/use-toast-message";
import { useRouter } from "next/navigation";

interface DeleteInvoiceProps {
  invoiceId: string;
}

export const DeleteInvoice = ({ invoiceId }: DeleteInvoiceProps) => {
  const toast = useShowToast();
  const router = useRouter();
  const handleConfirm = async () => {
    const response = await deleteInvoiceById(invoiceId);
    toast(response);
    router.refresh();
  };
  return (
    <>
      <AlertDialogTrigger asChild>
        <div className="flex gap-2">
          <Trash className="size-4 mr-2 shrink-0" />
          Delete Invoice
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            details and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};
