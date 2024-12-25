"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { CreateInvoiceForm } from "./create-invoice-form";
import { type User } from "@/app/(dashboard)/dashboard/account/types";
import { ProductProvider } from "../_contexts/product.context";
import { BusinessWithAddress } from "../../../type";
import { nanoid } from "nanoid";

interface CreateInvoiceProps {
  user: User;
  business: BusinessWithAddress;
}

export const CreateInvoice = ({ user, business }: CreateInvoiceProps) => {
  const invoiceId = nanoid();
  return (
    <ProductProvider>
      <Card className="">
        <CardHeader className="p-6 lg:p-8">
          <CardTitle>Business Name</CardTitle>
          <CardDescription>#{invoiceId}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 lg:p-8">
          <CreateInvoiceForm
            user={user}
            business={business}
            invoiceId={invoiceId}
          />
        </CardContent>
      </Card>
    </ProductProvider>
  );
};
