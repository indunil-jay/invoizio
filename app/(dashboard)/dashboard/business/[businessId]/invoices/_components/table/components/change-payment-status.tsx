"use client";
import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import { InvoiceStatus, invoiceStatus } from "../data/data";
import { Invoice } from "../data/schema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";
import { useRouter } from "next/navigation";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { changeInvoiceStatus } from "../../../actions";

interface ChangePaymentStatusProps {
    invoice: Invoice;
}

export const ChangePaymentStatus = ({ invoice }: ChangePaymentStatusProps) => {
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <Settings2 />
                Change Status
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {invoiceStatus.map((status) => (
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            disabled={
                                status.id === invoice.statusId || status.disable
                            }
                            key={status.id}
                        >
                            <ChangeInvoiceStatus
                                invoice={invoice}
                                status={status}
                            />
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};

interface ChangeInvoiceStatusProps {
    invoice: Invoice;
    status: InvoiceStatus;
}

export const ChangeInvoiceStatus = ({
    invoice,
    status,
}: ChangeInvoiceStatusProps) => {
    const router = useRouter();
    const { toast } = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        const response = await changeInvoiceStatus(invoice.id, status.id);
        toast(response);
        setIsLoading(false);
        setOpen(false);
        router.refresh();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div
                    className="flex gap-2 cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <status.icon className="mr-2 h-4 w-4 " />
                    {status.label}
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Invoice Status</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to change the status of this
                        invoice to <b>{status.label}</b>? This action may impact
                        payment tracking and customer notifications.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant={"secondary"}
                        disabled={isLoading}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={handleConfirm}>
                        {isLoading ? (
                            <>
                                <span>Changing</span>
                                <SpinnerBtnLoading />
                            </>
                        ) : (
                            <span>Change</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
