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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useState } from "react";

interface CreateInvoiceProps {
  user: User;
  business: BusinessWithAddress;
}

export const CreateInvoice = ({ user, business }: CreateInvoiceProps) => {
  const invoiceId = nanoid();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => setIsDialogOpen(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  onClose={handleClose}
                />
              </ProductProvider>
            </CardContent>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
