"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Badge } from "@/app/_components/ui/badge";
import { format } from "date-fns";
import { InvoiceType } from "@/shared/types/invoice-response-type";
import { DataTableColumnHeader } from "../data-table-columns-header";
import { invoiceStatus } from "../../data/data";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<InvoiceType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Invoice No" />
        ),
        cell: ({ row }) => (
            <div className="w-[180px]">
                <Badge variant={"secondary"}>#{row.original.id}</Badge>
            </div>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "client",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <div className="max-w-[500px] truncate ">
                        <p className="capitalize font-medium">
                            {row.original.client.name}
                        </p>
                        <p className="text-muted-foreground text-xs ">
                            {row.original.client.email}
                        </p>
                    </div>
                </div>
            );
        },
        enableSorting: false,

        filterFn: (row, id, value) => {
            const client = row.original.client;

            return (
                client.name.toLowerCase().includes(value.toLowerCase()) ||
                client.email.toLowerCase().includes(value.toLowerCase())
            );
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Amount"
                className="justify-end"
            />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.original.totalPrice);

            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return (
                <div className="text-right font-medium px-4">{formatted}</div>
            );
        },
        sortingFn: (rowA, rowB, columnId) => {
            const amountA = parseFloat(rowA.getValue(columnId));
            const amountB = parseFloat(rowB.getValue(columnId));

            return amountA - amountB;
        },
    },

    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Dates"
                className="justify-center"
            />
        ),
        cell: ({ row }) => {
            const issueDate = row.original.issueDate;
            const dueDate = row.original.dueDate;
            const formattedIssueDate = format(issueDate, "PPpp");
            const formattedDueDate = format(dueDate, "PPpp");
            return (
                <div className="flex flex-col gap-y-[2px] w-[240px]  px-4 truncate  ">
                    <div className="grid grid-cols-[1fr_2fr] ">
                        <p className="text-[10px] font-medium uppercase bg-neutral-100 px-[3px] py-[1px] rounded-md  w-fit ">
                            ISSUE DATE
                        </p>
                        <span className="text-xs justify-self-end">
                            {formattedIssueDate}
                        </span>
                    </div>
                    <div className="grid grid-cols-[1fr_2fr] ">
                        <p className="text-[10px] font-medium uppercase bg-neutral-100 px-[3px] py-[1px] rounded-md  w-fit">
                            {" "}
                            DUE DATE
                        </p>
                        <span className="text-xs justify-self-end">
                            {formattedDueDate}
                        </span>
                    </div>
                </div>
            );
        },
        sortingFn: (rowA, rowB) => {
            const dueDateA = new Date(rowA.original.dueDate).getTime();
            const dueDateB = new Date(rowB.original.dueDate).getTime();

            return dueDateA - dueDateB;
        },
    },

    {
        accessorKey: "statusId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = invoiceStatus.find(
                (i) => i.id === row.original.status.id
            );

            if (!status) return null;

            return (
                <div className="flex items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const status = invoiceStatus.find(
                (i) => i.id === row.original.status.id
            );

            if (!status) return false;

            return value.includes(status.label.toLowerCase());
        },
        enableSorting: false,
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
