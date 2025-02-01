import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { DownloadCloudIcon, MoreVertical } from "lucide-react";
import Link from "next/link";
import { BusinessWithAddress, InvoiceWithDetails } from "../../../type";
import { DeleteInvoice } from "./delete-invoice";
import { TogglePaymentStatus } from "./toggle-payment-status";
import { SendPaymentReminder } from "./send-payment-reminder";
import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { User } from "@/app/(dashboard)/dashboard/account/types";
import { UpdateInvoiceModal } from "./update-invoice-modal";

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
                    <UpdateInvoiceModal
                        user={user}
                        business={business}
                        invoice={invoice}
                    />
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${invoice.id}`} target="_blank">
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
