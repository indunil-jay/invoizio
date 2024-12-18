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

export const CreateNewInvoice = () => {
  return (
    <Card>
      <CardHeader className="p-6">
        <div className="flex items-center justify-between">
          <div className="">
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Manage your invoices right here</CardDescription>
          </div>

          <Button>
            <div className="flex size-6 items-center justify-center rounded-md border bg-primary text-primary-foreground shadow hover:bg-primary/90">
              <Plus className="size-4 bg-primary  shadow hover:bg-primary/90" />
            </div>
            <div className="font-medium ">Create Invoice</div>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <InvoiceTable />
      </CardContent>
    </Card>
  );
};
