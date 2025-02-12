"use client";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Separator } from "@/app/_components/ui/separator";
import { Textarea } from "@/app/_components/ui/textarea";
import { Label } from "@/app/_components/ui/label";
import { cn } from "@/app/_lib/tailwind-css/utils";

import { type User } from "@/app/(dashboard)/dashboard/account/types";
import {
  createProductFormSchema,
  Product,
} from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_components/add-product-form";
import { ProductsList } from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_components/product-list";
import { useProducts } from "../_contexts/product.context";
import { createNewInvoice } from "../create/actions";
import { BusinessWithAddress, InvoiceWithDetails } from "../../../type";
import { useShowToast } from "@/app/_hooks/custom/use-toast-message";
import { useEffect } from "react";
import { updateInvoice } from "../actions";
import { useRouter } from "next/navigation";

const addressSchema = z.object({
  addressLine1: z.string().min(1, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional().nullable(),
  city: z.string().min(1, { message: "City is required." }),
  postalCode: z
    .string()
    .min(1, { message: "Postal Code is required" })
    .refine((val) => (val ? /^\d{5,6}$/.test(val.toString()) : true), {
      message: "Postal code must be a valid 5-6 digit number.",
    }),
});

export const createInvoiceSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string().email({ message: "Please enter a valid email address." }),
  }),
  business: z.object({
    id: z.string(),
    name: z.string(),
    address: addressSchema,
  }),
  client: z.object({
    name: z.string().min(1, { message: "Client name is required." }),
    email: z
      .string()
      .email({ message: "Please enter a valid client email address." }),
    address: addressSchema,
  }),
  invoice: z.object({
    issueDate: z.date({ message: "Issue date is required." }),
    dueDate: z.date({ message: "Due date is required." }),
    description: z.string().min(1, { message: "Description is required." }),
  }),
  invoiceItems: z
    .array(createProductFormSchema)
    .min(1, { message: "At least one product is required." }),
});

interface InvoiceFormProps {
  user: User;
  business: BusinessWithAddress;
  invoiceId?: string;
  mode: "create" | "update";
  existingInvoice?: InvoiceWithDetails;
  onClose?: () => void;
}

export const InvoiceForm = ({
  user,
  business,
  invoiceId,
  mode,
  existingInvoice,
  onClose,
}: InvoiceFormProps) => {
  const {
    setProducts,
    products,
    grandTotal,
    totalBasePrice,
    totalDiscount,
    totalTax,
  } = useProducts();

  const form = useForm<z.infer<typeof createInvoiceSchema>>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      user: {
        id: user.id,
        email: user.email,
      },
      business: {
        address: {
          addressLine1: business.address.addressLine1,
          addressLine2: business.address.addressLine2 ?? "",
          city: business.address.city,
          postalCode: business.address.postalCode,
        },
        id: business.id,
        name: business.name,
      },

      client: {
        name: existingInvoice ? existingInvoice.client.name : "",
        email: existingInvoice ? existingInvoice.client.email : "",
        address: {
          addressLine1: existingInvoice
            ? existingInvoice.client.address.addressLine1
            : "",
          addressLine2: existingInvoice
            ? existingInvoice.client.address.addressLine2
            : "",
          city: existingInvoice ? existingInvoice.client.address.city : "",
          postalCode: existingInvoice
            ? existingInvoice.client.address.postalCode
            : "",
        },
      },
      invoice: {
        description: existingInvoice ? existingInvoice.description : " ",
        issueDate: existingInvoice
          ? new Date(existingInvoice.issueDate)
          : new Date(),
        dueDate: existingInvoice
          ? new Date(existingInvoice.dueDate)
          : undefined,
      },
      invoiceItems: existingInvoice
        ? ([...existingInvoice.invoiceItems, ...products] as Product[])
        : products,
    },
  });

  const toast = useShowToast();
  const router = useRouter();
  useEffect(() => {
    if (existingInvoice && mode === "update") {
      setProducts([...existingInvoice.invoiceItems] as Product[]);
    }
  }, [existingInvoice, mode, setProducts]);

  const handleAddProduct = (product: Product) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, product];
      form.setValue("invoiceItems", updatedProducts);
      return updatedProducts;
    });
  };

  const onSubmit = async (data: z.infer<typeof createInvoiceSchema>) => {
    const obj = {
      user: data.user,
      client: data.client,
      business: data.business,
      invoice: {
        id: mode === "create" ? invoiceId : existingInvoice!.id,
        grandTotal,
        totalBasePrice,
        totalDiscount,
        totalTax,
        description: data.invoice.description,
        issueDate: data.invoice.issueDate,
        dueDate: data.invoice.dueDate,
      },
      invoiceItems: data.invoiceItems,
    };
    const response =
      mode === "create"
        ? await createNewInvoice(obj)
        : await updateInvoice(obj);

    toast(response);
    onClose?.();
    router.refresh();
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BillFromFormSection />
          <BillToFormSection mode={mode} />
        </div>
        <Separator />
        <BillDetailsFormSection />

        <Separator />

        <ProductsList
          products={products || form.getValues("invoiceItems")}
          onAddProduct={handleAddProduct}
        />

        <Separator />
        <div className="flex justify-end items-center gap-5">
          <Button
            size={"lg"}
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              onClose?.();
            }}
          >
            Cancle
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            size={"lg"}
          >
            {form.formState.isSubmitting
              ? mode === "create"
                ? "Creating Invoice..."
                : "Updating Invoice..."
              : mode === "create"
              ? "Create Invoice"
              : "Update Invoice"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

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
              <Input placeholder="Your business name" {...field} disabled />
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
              <Input placeholder="yourname@business.com" {...field} disabled />
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
          <AddressForm fieldPrefix="business.address" disabled={true} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

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
                billToAddress ? "text-primary" : "text-muted-foreground"
              )}
            >
              {billToAddress || "client address"}
            </div>
          </FormItem>
        </PopoverTrigger>
        <PopoverContent>
          <AddressForm fieldPrefix="client.address" disabled={false} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

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
              <Label className="text-primary/80 text-xs">Issue Date:</Label>
              <FormControl>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full  lg:w-[280px]  justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
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
              <Label className="text-primary/80 text-xs">Due Date:</Label>
              <FormControl>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full lg:w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
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

interface AddressFormProps {
  fieldPrefix: string;
  disabled: boolean;
}

export const AddressForm = ({
  fieldPrefix,
  disabled = false,
}: AddressFormProps) => {
  const form = useFormContext();

  const createFieldName = (fieldName: string) => `${fieldPrefix}.${fieldName}`;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={createFieldName("addressLine1")}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary/80 text-xs">
              Address Line 1:
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter address line 1"
                {...field}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={createFieldName("addressLine2")}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary/80 text-xs">
              Address Line 2:
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter address line 2"
                {...field}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={createFieldName("city")}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary/80 text-xs">City:</FormLabel>
            <FormControl>
              <Input placeholder="Enter city" {...field} disabled={disabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={createFieldName("postalCode")}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary/80 text-xs">
              Postal Code:
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter postal code"
                {...field}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
