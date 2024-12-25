import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { DownloadCloudIcon, Mail, MoreVertical, Pencil } from "lucide-react";
import Link from "next/link";
import { InvoiceWithDetails } from "../../../type";
import { DeleteInvoice } from "./delete-invoice";
import { TogglePaymentStatus } from "./toggle-payment-status";

interface InvoiceActionsProps {
  invoice: InvoiceWithDetails;
}

export const InvoiceActions = ({ invoice }: InvoiceActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`#`}>
            <Pencil className="size-4 mr-2 shrink-0" />
            Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`#`}>
            <DownloadCloudIcon className="size-4 mr-2 shrink-0" />
            Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`#`}>
            <Mail className="size-4 mr-2 shrink-0" />
            Send Reminder
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteInvoice invoiceId={invoice.id} />
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <TogglePaymentStatus invoice={invoice} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
