"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { invoiceSchema } from "../data/schema";
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
import { invoiceStatus } from "../data/data";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const invoice = invoiceSchema.parse(row.original);

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
            <DropdownMenuContent align="end" className="w-[12rem]">
                <DropdownMenuItem disabled={invoice.statusId === 2}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Download
                    {/*
                    <Link href={`/api/invoice/${invoice.id}`} target="_blank">
                                            <DownloadCloudIcon className="size-4 mr-2 shrink-0" />
                                            Download Invoice
                                        </Link> */}
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={invoice.statusId === 2}
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
