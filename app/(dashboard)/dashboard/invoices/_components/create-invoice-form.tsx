"use client";
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
import { cn } from "@/app/_lib/tailwind-css/utils";
import { CalendarIcon, Plus } from "lucide-react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

export const createInvoiceSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string().email(),
  }),
  business: z.object({
    id: z.string(),
    name: z.string(),
    address: z.object({
      addressLine1: z.string(),
      addressLine2: z.string().optional(),
      city: z.string(),
      postalCode: z.coerce.number(),
    }),
  }),
  invoice: z.object({
    issueDate: z.coerce.date(),
    dueDate: z.coerce.date(),
    description: z.string().min(1),
  }),
});

export const CreateInvoiceForm = () => {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="space-y-8"
      >
        <div className="grid grid-cols-2 gap-6">
          <BillFromForm />
          <BillToForm />
        </div>
        <Separator />
        <BillDetailsForm />
        <Separator />
        <ProductsList />
        <Separator />
        <div className="flex justify-end items-center gap-5">
          <Button size={"lg"} variant={"destructive"}>
            Cancle
          </Button>
          <Button size={"lg"}>Create an Invoice</Button>
        </div>
      </form>
    </FormProvider>
  );
};

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  taxRate: number; // Percentage (e.g., 2 for 2%)
}

const products: Product[] = [
  { id: 1, name: "Car Light", quantity: 1, price: 400, taxRate: 2 },
  { id: 2, name: "Some Product", quantity: 2, price: 400, taxRate: 1.15 },
];

export const ProductTable = () => {
  const calculateTax = (price: number, quantity: number, taxRate: number) =>
    ((price * taxRate) / 100) * quantity;

  const calculateTotal = (price: number, quantity: number, tax: number) =>
    price * quantity + tax;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">ID</TableHead>
            <TableHead scope="col">Product Name</TableHead>
            <TableHead scope="col">Qty</TableHead>
            <TableHead scope="col">Price</TableHead>
            <TableHead scope="col">Tax %</TableHead>
            <TableHead className="text-right" scope="col">
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const tax = calculateTax(
              product.price,
              product.quantity,
              product.taxRate
            );
            const total = calculateTotal(product.price, product.quantity, tax);

            return (
              <TableRow key={product.id}>
                <TableCell>{`#${product.id}`}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{`$${product.price.toFixed(2)}`}</TableCell>
                <TableCell>{`$${product.taxRate.toFixed(2)}`}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-muted-foreground">{`Base: $${(
                      product.price * product.quantity
                    ).toFixed(2)}`}</p>
                    <p className="text-xs text-muted-foreground">{`+ Tax: $${tax.toFixed(
                      2
                    )}`}</p>
                    <Separator className="my-1 w-1/2" />
                    <p className="text-sm font-medium">{`$${total.toFixed(
                      2
                    )}`}</p>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              <div className="flex flex-col items-end">
                <p className="text-xs text-muted-foreground">{`Base: $${(4000).toFixed(
                  2
                )}`}</p>
                <p className="text-xs text-muted-foreground">{`+ Tax: $${(120.7823).toFixed(
                  2
                )}`}</p>
                <Separator className="my-1 w-1/2" />
                <p className="text-sm font-medium">{`$${4100.242}`}</p>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export const ProductsList = () => {
  return (
    <>
      <div className="flex items-start justify-between">
        <p className="text-xs text-muted-foreground ">
          Add product details individually by clicking the button
        </p>
        <Button size={"sm"}>
          <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
            <Plus className="size-4 text-primary-foreground " />
          </div>

          <div className="font-medium text-primary-foreground ">
            Add Product
          </div>
        </Button>
      </div>
      <ProductTable />
    </>
  );
};

export const BillFromForm = () => {
  const form = useFormContext();

  // Check if the address is complete
  const billFromAddress =
    form.getValues("billFromAddressLine1") &&
    form.getValues("billFromCity") &&
    form.getValues("billFromPostalCode")
      ? `${form.getValues("billFromAddressLine1")}, ${form.getValues(
          "billFromCity"
        )}, ${form.getValues("billFromPostalCode")}`
      : "";

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="billFromName"
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
        name="billFromEmail"
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
      <Popover>
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
          <AddressForm fieldPrefix="billFrom" disabled={true} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const BillToForm = () => {
  const form = useFormContext();

  // Check if the address is complete
  const billToAddress =
    form.getValues("billToAddressLine1") &&
    form.getValues("billToCity") &&
    form.getValues("billToPostalCode")
      ? `${form.getValues("billToAddressLine1")}, ${form.getValues(
          "billToCity"
        )}, ${form.getValues("billToPostalCode")}`
      : "";

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="billToName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary/80 text-xs">
              Bill To (Name):
            </FormLabel>
            <FormControl>
              <Input placeholder="Client's name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="billToEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary/80 text-xs">
              Bill To (Email):
            </FormLabel>
            <FormControl>
              <Input placeholder="client@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Popover>
        <PopoverTrigger asChild>
          <FormItem>
            <FormLabel className="text-primary/80 text-xs">
              Bill To (Address):
            </FormLabel>
            <FormControl>
              <Input
                className="text-muted-foreground"
                value={billToAddress || "client adress"}
                placeholder="123 ct main street ,kandy"
                readOnly
              />
            </FormControl>
          </FormItem>
        </PopoverTrigger>
        <PopoverContent>
          <AddressForm fieldPrefix="billTo" disabled={false} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const BillDetailsForm = () => {
  const form = useFormContext();

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="issueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary/80 text-xs">
                Issue Date:
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
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
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary/80 text-xs">
                Due Date:
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
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
        name="description"
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

  const createFieldName = (fieldName: string) =>
    `${fieldPrefix}${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`;

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
                defaultValue={form.getValues(createFieldName("addressLine1"))}
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
                defaultValue={form.getValues(createFieldName("addressLine2"))}
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
              <Input
                placeholder="Enter city"
                defaultValue={form.getValues(createFieldName("city"))}
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
        name={createFieldName("postalCode")}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary/80 text-xs">
              Postal Code:
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter postal code"
                defaultValue={form.getValues(createFieldName("postalCode"))}
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
