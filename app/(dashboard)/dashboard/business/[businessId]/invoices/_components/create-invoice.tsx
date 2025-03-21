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
import { ProductProvider } from "../_contexts/product.context";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useBusinessStore } from "@/app/stores/business-store";
import { useUserStore } from "@/app/stores/user-store";

export const CreateInvoice = () => {
    const params = useParams();
    const getBusinessById = useBusinessStore((state) => state.getBusinessById);
    const business = getBusinessById(params.businessId as string);
    const user = useUserStore((state) => state.user);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [invoiceId, setInvoiceId] = useState("");

    useEffect(() => {
        setInvoiceId(nanoid());
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
            <DialogContent className="max-w-2xl h-[90vh] p-0 overflow-clip">
                <ScrollArea>
                    <Card className="">
                        <CardHeader className="p-6 lg:p-8">
                            <CardTitle>Business Name</CardTitle>
                            <CardDescription>#{invoiceId}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 lg:p-8">
                            <ProductProvider>
                                <InvoiceForm
                                    user={user!}
                                    business={business!}
                                    invoiceId={invoiceId}
                                    mode="create"
                                    onClose={handleClose}
                                />
                            </ProductProvider>
                        </CardContent>
                    </Card>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
