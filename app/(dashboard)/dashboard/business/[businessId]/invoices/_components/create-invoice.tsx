"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { InvoiceForm } from "./invoice-form";
import { type User } from "@/app/(dashboard)/dashboard/account/types";
import { BusinessWithAddress } from "../../../type";
import { nanoid } from "nanoid";
import { ProductProvider } from "../_contexts/product.context";

interface CreateInvoiceProps {
  user: User;
  business: BusinessWithAddress;
}

export const CreateInvoice = ({ user, business }: CreateInvoiceProps) => {
  const invoiceId = nanoid();
  return (
    <Card className="">
      <CardHeader className="p-6 lg:p-8">
        <CardTitle>Business Name</CardTitle>
        <CardDescription>#{invoiceId}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 lg:p-8">
        <ProductProvider>
          <InvoiceForm
            user={user}
            business={business}
            invoiceId={invoiceId}
            mode="create"
          />
        </ProductProvider>
      </CardContent>
    </Card>
  );
};
