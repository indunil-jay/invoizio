"use client";
import {
    Dialog,
    DialogDescription,
    DialogTrigger,
    DialogTitle,
    DialogContent,
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { InvoiceType } from "@/shared/types/invoice-response-type";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface UpdateInvoiceProps {
    invoice: InvoiceType;
}

export const UpdateInvoice = ({ invoice }: UpdateInvoiceProps) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const handleClose = () => setIsOpenDialog(false);
    return (
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
                <button className="flex">
                    <Pencil className="size-4 mr-2 shrink-0" />
                    Edit Invoice
                </button>
            </DialogTrigger>
            <VisuallyHidden>
                <DialogTitle>title</DialogTitle>
                <DialogDescription>description</DialogDescription>
            </VisuallyHidden>
            <DialogContent
                onKeyDown={(e) => e.stopPropagation()}
                className="max-w-2xl h-[90vh] p-0 overflow-clip"
            >
                <ScrollArea>{JSON.stringify(invoice)}</ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
