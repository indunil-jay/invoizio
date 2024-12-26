import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { DownloadCloudIcon, MoreVertical, Pencil } from "lucide-react";
import Link from "next/link";
import { InvoiceWithDetails } from "../../../type";
import { DeleteInvoice } from "./delete-invoice";
import { TogglePaymentStatus } from "./toggle-payment-status";
import { SendPaymentReminder } from "./send-payment-reminder";
import { AlertDialog } from "@/app/_components/ui/alert-dialog";

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

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <AlertDialog>
            <SendPaymentReminder invoiceId={invoice.id} />
          </AlertDialog>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <AlertDialog>
            <DeleteInvoice invoiceId={invoice.id} />
          </AlertDialog>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <AlertDialog>
            <TogglePaymentStatus invoice={invoice} />
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
