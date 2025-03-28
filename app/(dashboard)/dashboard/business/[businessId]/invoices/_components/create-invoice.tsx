"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { InvoiceForm } from "./invoice-form";
import { nanoid } from "nanoid";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Business } from "@/app/stores/business-store";

import { InvoiceItemsProvider } from "../_contexts/invoice-items-context";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface CreateInvoiceProps {
    business: Business;
}

export const CreateInvoice = ({ business }: CreateInvoiceProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="size-4" />
                    <div className="font-medium ">Create Invoice</div>
                </Button>
            </DialogTrigger>
            <VisuallyHidden>
                <DialogTitle>hidden title</DialogTitle>
                <DialogDescription>hidden description</DialogDescription>
            </VisuallyHidden>
            <DialogContent className="max-w-2xl h-[90vh] p-0 overflow-clip">
                <ScrollArea>
                    <InvoiceCreateCard
                        business={business}
                        setIsDialogOpen={setIsDialogOpen}
                    />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
export interface InvoiceCreateCardProps {
    business: Business;
    setIsDialogOpen?: Dispatch<SetStateAction<boolean>>;
    refresh?: boolean;
}

export const InvoiceCreateCard = ({
    business,
    setIsDialogOpen,
}: InvoiceCreateCardProps) => {
    const [invoiceId, setInvoiceId] = useState("");

    useEffect(() => {
        setInvoiceId(nanoid(16).toUpperCase());
    }, [setInvoiceId]);

    const handleClose = () => {
        setInvoiceId(nanoid(16).toUpperCase());
        setIsDialogOpen?.(false);
    };
    return (
        <Card className="">
            <CardHeader className="p-6 lg:p-8">
                <CardTitle className="capitalize">{business.name}</CardTitle>
                <CardDescription className="uppercase">
                    #{invoiceId}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <InvoiceItemsProvider>
                    <InvoiceForm
                        business={business}
                        invoiceId={invoiceId}
                        mode="create"
                        onClose={handleClose}
                    />
                </InvoiceItemsProvider>
            </CardContent>
        </Card>
    );
};
