import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { CreateInvoiceForm } from "./create-invoice-form";
import { type User } from "@/app/(dashboard)/dashboard/account/types";

interface CreateInvoiceProps {
  user: User;
}

export const CreateInvoice = ({ user }: CreateInvoiceProps) => {
  return (
    <Card className="">
      <CardHeader className="p-6 lg:p-8">
        <CardTitle>Business Name</CardTitle>
      </CardHeader>
      <CardContent className="p-6 lg:p-8">
        <CreateInvoiceForm user={user} />
      </CardContent>
    </Card>
  );
};
