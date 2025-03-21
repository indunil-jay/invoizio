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
import { Label } from "@/app/_components/ui/label";
import { cn } from "@/app/_lib/tailwind-css/utils";

export const BillToFormSection = ({ mode }: { mode: "create" | "update" }) => {
    const form = useFormContext<z.infer<typeof createInvoiceSchema>>();

    const billToAddress =
        form.getValues("client.address.addressLine1") &&
        form.getValues("client.address.city")
            ? `${form.getValues("client.address.addressLine1")}, ${form.getValues(
                  "client.address.city"
              )}`
            : "";

    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="client.name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-primary/80 text-xs">
                            Bill To (Name):
                        </FormLabel>
                        <FormControl>
                            <Input
                                disabled={mode === "update"}
                                placeholder="client's name"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="client.email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-primary/80 text-xs">
                            Bill To (Email):
                        </FormLabel>
                        <FormControl>
                            <Input
                                disabled={mode === "update"}
                                placeholder="client@example.com"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Popover modal={true}>
                <PopoverTrigger asChild>
                    <FormItem>
                        <Label className="text-primary/80 text-xs">
                            Bill To (Address):
                        </Label>

                        <div
                            className={cn(
                                "flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                billToAddress
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {billToAddress || "client address"}
                        </div>
                    </FormItem>
                </PopoverTrigger>
                <PopoverContent>
                    <AddressForm
                        fieldPrefix="client.address"
                        disabled={false}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
