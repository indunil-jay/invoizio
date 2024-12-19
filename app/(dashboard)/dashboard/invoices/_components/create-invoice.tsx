import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { CreateInvoiceForm } from "./create-invoice-form";

export const CreateInvoice = () => {
  return (
    <Card className="p-8">
      <CardHeader>
        <CardTitle>Business Name</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateInvoiceForm />
      </CardContent>
    </Card>
  );
};
