"use client";

import { Row } from "@tanstack/react-table";
import { DownloadCloudIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import { DeleteInvoice } from "./delete-invoice";
import { ChangePaymentStatus } from "./change-payment-status";
import { SendPaymentReminder } from "./send-payment-reminder";
import { UpdateInvoice } from "./update-invoice";
import { InvoiceSchema } from "@/shared/types/invoice-response-type";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const invoice = InvoiceSchema.parse(row.original);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[11rem]">
                <DropdownMenuItem
                    disabled={invoice.status.id === 2}
                    onSelect={(e) => e.preventDefault()}
                >
                    <UpdateInvoice invoice={invoice} />
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Link
                        href={`/api/invoice/${invoice.id}`}
                        target="_blank"
                        className="flex"
                    >
                        <DownloadCloudIcon className="size-4 mr-2 shrink-0" />
                        Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={invoice.status.id === 2}
                    onSelect={(e) => e.preventDefault()}
                >
                    <SendPaymentReminder invoice={invoice} />
                </DropdownMenuItem>

                <ChangePaymentStatus invoice={invoice} />
                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="focus:bg-destructive focus:text-destructive-foreground cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                >
                    <DeleteInvoice invoiceId={invoice.id} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
