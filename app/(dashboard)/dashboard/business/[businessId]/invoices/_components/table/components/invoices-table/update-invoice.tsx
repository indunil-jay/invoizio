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

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { InvoiceItemsProvider } from "../../../../_contexts/invoice-items-context";
import { InvoiceForm } from "../../../invoice-form";

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
                <ScrollArea>
                    <Card>
                        <CardHeader className="p-6 lg:p-8">
                            <CardTitle>{invoice.business.name}</CardTitle>
                            <CardDescription className="uppercase">
                                #{invoice.id}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 lg:p-8">
                            <InvoiceItemsProvider>
                                <InvoiceForm
                                    mode="update"
                                    existingInvoice={invoice}
                                    onClose={handleClose}
                                />
                            </InvoiceItemsProvider>
                        </CardContent>
                    </Card>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
