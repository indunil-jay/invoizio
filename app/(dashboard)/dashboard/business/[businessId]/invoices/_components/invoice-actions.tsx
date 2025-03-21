import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Business } from "@/app/stores/business-store";
import { InvoiceType } from "@/shared/types/invoice-response-type";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { DownloadCloudIcon, MoreVertical } from "lucide-react";
import Link from "next/link";

interface InvoiceActionsProps {
    invoice: InvoiceType;
    business: Business;
}

export const InvoiceActions = ({ invoice, business }: InvoiceActionsProps) => {
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
                    {/* <UpdateInvoiceModal
                        user={user}
                        business={business}
                        invoice={invoice}
                    /> */}
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${invoice.id}`} target="_blank">
                        <DownloadCloudIcon className="size-4 mr-2 shrink-0" />
                        Download Invoice
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <AlertDialog>
                        {/* <SendPaymentReminder invoiceId={invoice.id} /> */}
                    </AlertDialog>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <AlertDialog>
                        {/* <DeleteInvoice invoiceId={invoice.id} /> */}
                    </AlertDialog>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <AlertDialog>
                        {/* <TogglePaymentStatus invoice={invoice} /> */}
                    </AlertDialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
