"use client";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { createInvoiceSchema } from "@/shared/validation-schemas/invoice/create-invoice-form-schema";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Input } from "@/app/_components/ui/input";
import { AddressForm } from "./address-form";

export const BillFromFormSection = () => {
    const form = useFormContext<z.infer<typeof createInvoiceSchema>>();

    // Check if the address is complete
    const billFromAddress =
        form.getValues("business.address.addressLine1") &&
        form.getValues("business.address.city")
            ? `${form.getValues("business.address.addressLine1")}, ${form.getValues(
                  "business.address.city"
              )}`
            : "";

    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="business.name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-primary/80 text-xs">
                            Bill From (Name):
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Your business name"
                                {...field}
                                disabled
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="user.email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-primary/80 text-xs">
                            Bill From (Email):
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="yourname@business.com"
                                {...field}
                                disabled
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Popover modal={true}>
                <PopoverTrigger asChild>
                    <FormItem>
                        <FormLabel className="text-primary/80 text-xs">
                            Bill From (Address):
                        </FormLabel>
                        <FormControl>
                            <Input
                                className="text-muted-foreground"
                                value={billFromAddress || "your address"}
                                placeholder="123 ct main street ,kandy"
                                readOnly
                            />
                        </FormControl>
                    </FormItem>
                </PopoverTrigger>
                <PopoverContent>
                    <AddressForm
                        fieldPrefix="business.address"
                        disabled={true}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
