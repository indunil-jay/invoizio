import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Plus } from "lucide-react";
import { InvoiceTable } from "./invoice-table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { CreateInvoice } from "./create-invoice";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
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

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <div className="flex size-6 items-center justify-center rounded-md border bg-primary text-primary-foreground shadow hover:bg-primary/90">
                  <Plus className="size-4 bg-primary  shadow hover:bg-primary/90" />
                </div>
                <div className="font-medium ">Create Invoice</div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl h-[90vh] p-0 overflow-clip">
              <ScrollArea>
                <CreateInvoice user={user} business={business} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <InvoiceTable invoices={invoices} user={user} business={business} />
      </CardContent>
    </Card>
  );
};
