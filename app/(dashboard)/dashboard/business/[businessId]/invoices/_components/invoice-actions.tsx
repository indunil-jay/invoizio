import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  CircleCheck,
  DownloadCloudIcon,
  Mail,
  MoreVertical,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { InvoiceWithDetails } from "../../../type";
import { DeleteInvoice } from "./delete-invoice";

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

        <DropdownMenuItem asChild>
          <Link href={`#`}>
            <CircleCheck className="size-4 mr-2 shrink-0" />
            Mark as Paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
