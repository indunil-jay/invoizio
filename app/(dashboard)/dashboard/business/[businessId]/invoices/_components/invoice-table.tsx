"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { InvoiceActions } from "./invoice-actions";
import { InvoiceWithDetails } from "../../../type";
import { AlertDialog } from "@/app/_components/ui/alert-dialog";

interface InvoiceTableProps {
  invoices: InvoiceWithDetails[] | null;
}

export const InvoiceTable = ({ invoices }: InvoiceTableProps) => {
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
              <TableCell>{invoice.status.status}</TableCell>
              <TableCell>{invoice.dueDate.toString()}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <InvoiceActions invoice={invoice} />
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
