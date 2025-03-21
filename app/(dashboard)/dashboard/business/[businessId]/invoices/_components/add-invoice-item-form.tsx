"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";

import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { createInvoiceItemFormSchema } from "@/shared/validation-schemas/invoice/create-invoice-item-form-schema";
import { InvoiceItem } from "../_utils/types";

export const AddProductForm = ({
    onAddProduct,
    handleClose,
}: {
    onAddProduct: (data: InvoiceItem) => void;
    handleClose: () => void;
}) => {
    const form = useForm<z.infer<typeof createInvoiceItemFormSchema>>({
        resolver: zodResolver(createInvoiceItemFormSchema),
        defaultValues: {
            price: 0,
            name: "",
            quantity: 1,
            taxRate: 0,
            discountRate: 0,
        },
    });

    const handleOnSubmit = (
        values: z.infer<typeof createInvoiceItemFormSchema>
    ) => {
        onAddProduct(values);
        form.reset();
        handleClose();
    };
    return (
        <Form {...form}>
            <Card className="p-0 border-none shadow-none">
                <form>
                    <CardContent className="px-0">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary/80 text-xs">
                                        Product Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Product name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-2">
                                    <FormLabel className="text-primary/80 text-xs">
                                        Quantity
                                    </FormLabel>
                                    <FormControl className="col-span-2">
                                        <Input {...field} placeholder="ex: 3" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-2">
                                    <FormLabel className="text-primary/80 text-xs">
                                        Price
                                        <span className="block text-muted-foreground">
                                            (per each)
                                        </span>
                                    </FormLabel>
                                    <FormControl className="col-span-2">
                                        <Input
                                            {...field}
                                            placeholder="ex: 120.99"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taxRate"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-2">
                                    <FormLabel className="text-primary/80 text-xs">
                                        Tax Rate
                                        <span className="block text-muted-foreground">
                                            (per each %)
                                        </span>
                                    </FormLabel>
                                    <FormControl className="col-span-2">
                                        <Input
                                            {...field}
                                            placeholder="ex: 0.40"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discountRate"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-2">
                                    <FormLabel className="text-primary/80 text-xs">
                                        Discount Rate
                                        <span className="block text-muted-foreground">
                                            (per each %)
                                        </span>
                                    </FormLabel>
                                    <FormControl className="col-span-2">
                                        <Input
                                            {...field}
                                            placeholder="ex: 0.40"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="p-0 flex items-center justify-between">
                        <Button size={"sm"} type="reset" onClick={handleClose}>
                            Cancle
                        </Button>
                        <Button
                            type="button"
                            size={"sm"}
                            onClick={form.handleSubmit(handleOnSubmit)}
                        >
                            Add
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </Form>
    );
};
