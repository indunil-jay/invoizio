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
import { Label } from "@/app/_components/ui/label";
import { cn } from "@/app/_lib/tailwind-css/utils";
import { Button } from "@/app/_components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/app/_components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/app/_components/ui/textarea";

export const BillDetailsFormSection = () => {
    const form = useFormContext<z.infer<typeof createInvoiceSchema>>();

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="invoice.issueDate"
                    render={({ field }) => (
                        <FormItem className="flex-col flex">
                            <Label className="text-primary/80 text-xs">
                                Issue Date:
                            </Label>
                            <FormControl>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full  lg:w-[280px]  justify-start text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon />
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                            fromDate={new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="invoice.dueDate"
                    render={({ field }) => (
                        <FormItem className="flex-col flex">
                            <Label className="text-primary/80 text-xs">
                                Due Date:
                            </Label>
                            <FormControl>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full lg:w-[280px] justify-start text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon />
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                            fromDate={new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="invoice.description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-primary/80 text-xs">
                            Invoice Description:
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                rows={3}
                                placeholder="Provide details about the invoice"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};
