import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { DownloadCloudIcon, MoreVertical, Pencil } from "lucide-react";
import Link from "next/link";
import { BusinessWithAddress, InvoiceWithDetails } from "../../../type";
import { DeleteInvoice } from "./delete-invoice";
import { TogglePaymentStatus } from "./toggle-payment-status";
import { SendPaymentReminder } from "./send-payment-reminder";

import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { UpdateInvoice } from "./update-invoice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { User } from "@/app/(dashboard)/dashboard/account/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface InvoiceActionsProps {
  invoice: InvoiceWithDetails;
  user: User;
  business: BusinessWithAddress;
}

export const InvoiceActions = ({
  invoice,
  user,
  business,
}: InvoiceActionsProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <MoreVertical className="size-4 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex gap-2">
                <Pencil className="size-4 mr-2 shrink-0" />
                Edit Invoice
              </button>
            </DialogTrigger>
            <VisuallyHidden>
              <DialogTitle>title</DialogTitle>
              <DialogDescription>description</DialogDescription>
            </VisuallyHidden>
            <DialogContent
              onKeyDown={(e) => e.stopPropagation()}
              className="max-w-2xl h-[90vh] p-0 overflow-clip"
            >
              <ScrollArea>
                <UpdateInvoice
                  invoice={invoice}
                  business={business}
                  user={user}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
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
