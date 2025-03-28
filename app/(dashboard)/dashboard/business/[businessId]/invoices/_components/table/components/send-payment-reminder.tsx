import { useRouter } from "next/navigation";
import { Clock, Mail } from "lucide-react";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { useEffect, useState } from "react";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Invoice } from "../data/schema";
import { addMilliseconds, isBefore, differenceInMinutes } from "date-fns";
import { sendPaymentReminder } from "../../../actions";
import { COOLDOWN_PERIOD } from "@/shared/constants";
import { InvoiceType } from "@/shared/types/invoice-response-type";

interface SendPaymentReminderProps {
    invoice: InvoiceType;
}

export const SendPaymentReminder = ({ invoice }: SendPaymentReminderProps) => {
    const router = useRouter();
    const { toast } = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [remainingTime, setRemainingTime] = useState<string | null>(null);

    useEffect(() => {
        if (invoice.lastEmailSentAt) {
            const lastSentDate = new Date(invoice.lastEmailSentAt);
            const cooldownExpiry = addMilliseconds(
                lastSentDate,
                COOLDOWN_PERIOD
            );
            const now = new Date();

            if (isBefore(now, cooldownExpiry)) {
                const updateRemainingTime = () => {
                    const nowUpdated = new Date();
                    if (isBefore(nowUpdated, cooldownExpiry)) {
                        const minutesLeft = differenceInMinutes(
                            cooldownExpiry,
                            nowUpdated
                        );
                        const hours = Math.floor(minutesLeft / 60);
                        const minutes = minutesLeft % 60;
                        setRemainingTime(`${hours}h ${minutes}m`);
                    } else {
                        setRemainingTime(null);
                    }
                };

                updateRemainingTime();

                // Update every 1 minute instead of every second
                const interval = setInterval(updateRemainingTime, 60 * 1000);

                return () => clearInterval(interval);
            }
        }
    }, [invoice.lastEmailSentAt]);

    const handleConfirm = async () => {
        setIsLoading(true);
        const response = await sendPaymentReminder(invoice.id);
        toast(response);
        setIsLoading(false);
        setOpen(false);
        router.refresh();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div
                className={`flex  items-center ${
                    remainingTime
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                }`}
                onClick={() => !remainingTime && setOpen(true)}
            >
                <Mail className="mr-2 h-4 w-4" />
                {remainingTime ? (
                    <div className="flex flex-col gap-y-[1px]">
                        <span>Send Reminder</span>
                        <span className="text-xs flex">
                            Wait {remainingTime}
                            <Clock className="ml-2 h-4 w-4" />
                        </span>
                    </div>
                ) : (
                    <span>Send Reminder</span>
                )}
            </div>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Sending Payment Reminder?</DialogTitle>
                    <DialogDescription>
                        Sending this email will notify the client about the
                        outstanding payment. Please confirm to proceed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={isLoading} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading || remainingTime !== null}
                        className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                        onClick={handleConfirm}
                    >
                        {isLoading ? (
                            <>
                                <span>Sending</span>
                                <SpinnerBtnLoading />
                            </>
                        ) : (
                            <span>Continue and Send</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
