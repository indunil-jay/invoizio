"use client";
import { Button } from "@/app/_components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddProductForm } from "./add-invoice-item-form";
import { InvoiceItemsTable } from "./invoice-items-table";
import { InvoiceItem } from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_utils/types";

export const InvoiceItemsList = ({
    products,
    onAddProduct,
}: {
    products: InvoiceItem[];
    onAddProduct: (product: InvoiceItem) => void;
}) => {
    const [isOpenProductForm, setIsOpenProductForm] = useState(false);
    const handleClose = () => setIsOpenProductForm(false);
    return (
        <>
            <div className="flex items-start justify-between">
                <p className="text-xs text-muted-foreground ">
                    Add product details individually by clicking the button
                </p>
                <Popover
                    modal={true}
                    onOpenChange={setIsOpenProductForm}
                    open={isOpenProductForm}
                >
                    <PopoverTrigger asChild>
                        <Button size={"sm"}>
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus className="size-4 text-primary-foreground " />
                            </div>

                            <div className="font-medium text-primary-foreground ">
                                Add Item
                            </div>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent align="end">
                        <AddProductForm
                            onAddProduct={onAddProduct}
                            handleClose={handleClose}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {products.length > 0 && <InvoiceItemsTable />}
        </>
    );
};
