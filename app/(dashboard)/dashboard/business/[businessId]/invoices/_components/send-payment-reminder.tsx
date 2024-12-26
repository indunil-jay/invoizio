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
import { useShowToast } from "@/app/_hooks/custom/use-toast-message";
import { useRouter } from "next/navigation";
import { sendPaymentReminderEmail } from "../actions";
import { Mail } from "lucide-react";

export const SendPaymentReminder = ({ invoiceId }: { invoiceId: string }) => {
  const toast = useShowToast();
  const router = useRouter();

  const handleConfirm = async () => {
    const response = await sendPaymentReminderEmail(invoiceId);
    toast(response);
    router.refresh();
  };
  return (
    <>
      <AlertDialogTrigger key={"send-reminder"} asChild>
        <div className="flex gap-2">
          <Mail className="size-4 mr-2 shrink-0" />
          Send Reminder
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent key={"send-reminder"}>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Sending Payment Reminder?</AlertDialogTitle>
          <AlertDialogDescription>
            Sending this email will notify the client about the outstanding
            payment. Please confirm to proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue and Send
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};
