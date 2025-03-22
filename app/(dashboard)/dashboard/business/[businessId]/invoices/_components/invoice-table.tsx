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
import { Card, CardContent } from "@/app/_components/ui/card";

interface InvoiceTableProps {
    invoices: InvoiceType[];
    business: Business;
}

export const InvoiceTable = ({ invoices, business }: InvoiceTableProps) => {
    return (
        <Card className="my-10">
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="text-left ">
                                    <p className="text-xs bg-neutral-100 rounded-md w-fit px-2 py-[1px] uppercase">
                                        #{invoice.id}
                                    </p>
                                </TableCell>
                                <TableCell className="text-left">
                                    {invoice.client.name}
                                </TableCell>
                                <TableCell className="text-left">
                                    {invoice.totalPrice}
                                </TableCell>
                                <TableCell className="text-left">
                                    {invoice.statusId}
                                </TableCell>
                                <TableCell className="text-left">
                                    {invoice.dueDate.toString()}
                                </TableCell>

                                <TableCell className="text-right">
                                    <InvoiceActions
                                        invoice={invoice}
                                        business={business}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
