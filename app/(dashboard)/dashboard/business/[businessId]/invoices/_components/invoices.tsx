import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { InvoiceTable } from "./invoice-table";
import { CreateInvoice } from "./create-invoice";
import { User } from "@/app/(dashboard)/dashboard/account/types";
import { BusinessWithAddress, InvoiceWithDetails } from "../../../type";

interface InvoiceProps {
  user: User;
  business: BusinessWithAddress;
  invoices: InvoiceWithDetails[] | null;
}

export const Invoices = ({ user, business, invoices }: InvoiceProps) => {
  return (
    <Card>
      <CardHeader className="p-6">
        <div className="flex items-center justify-between">
          <div className="">
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Manage your invoices right here</CardDescription>
          </div>

          <CreateInvoice user={user} business={business} />
        </div>
      </CardHeader>
      <CardContent>
        <InvoiceTable invoices={invoices} user={user} business={business} />
      </CardContent>
    </Card>
  );
};
