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
import { useEffect, useState } from "react";
import { Business } from "@/app/stores/business-store";
import { useUserStore } from "@/app/stores/user-store";
import { InvoiceItemsProvider } from "../_contexts/invoice-items-context";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface CreateInvoiceProps {
    business: Business;
}

export const CreateInvoice = ({ business }: CreateInvoiceProps) => {
    const user = useUserStore((state) => state.user);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [invoiceId, setInvoiceId] = useState("");

    useEffect(() => {
        setInvoiceId(nanoid().toUpperCase());
    }, []);

    const handleClose = () => setIsDialogOpen(false);
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
                    <Card className="">
                        <CardHeader className="p-6 lg:p-8">
                            <CardTitle>Business Name</CardTitle>
                            <CardDescription className="uppercase">
                                #{invoiceId}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 lg:p-8">
                            <InvoiceItemsProvider>
                                <InvoiceForm
                                    user={user!}
                                    business={business}
                                    invoiceId={invoiceId}
                                    mode="create"
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
