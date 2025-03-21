"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
import { Business } from "@/app/stores/business-store";
import { InvoiceType } from "@/shared/types/invoice-response-type";
import { InvoiceActions } from "./invoice-actions";

interface InvoiceTableProps {
    invoices: InvoiceType[];
    business: Business;
}

export const InvoiceTable = ({ invoices, business }: InvoiceTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!invoices ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            No Invoice data. Start creating the first one.
                        </TableCell>
                    </TableRow>
                ) : (
                    invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.client.name}</TableCell>
                            <TableCell>{invoice.totalPrice}</TableCell>
                            <TableCell>{invoice.statusId}</TableCell>
                            <TableCell>{invoice.dueDate.toString()}</TableCell>
                            <TableCell className="text-right">
                                <InvoiceActions
                                    invoice={invoice}
                                    business={business}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};
