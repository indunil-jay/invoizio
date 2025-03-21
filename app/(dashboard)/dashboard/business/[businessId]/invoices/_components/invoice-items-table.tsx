import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
import {
    calculateDiscount,
    calculateTax,
    calculateTotal,
} from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_utils/calculations";
import {
    formatCurrency,
    formatPercentage,
} from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_utils/formatter";
import { Separator } from "@/app/_components/ui/separator";
import { useInvoiceItems } from "../_contexts/invoice-items-context";

export const InvoiceItemsTable = () => {
    const {
        grandTotal,
        invoiceItems,
        totalBasePrice,
        totalDiscount,
        totalTax,
    } = useInvoiceItems();

    return (
        <div className="overflow-x-auto w-full relative">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">ID</TableHead>
                        <TableHead className="text-left">
                            Product Name
                        </TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-center">
                            Price{" "}
                            <span className="block text-xs">(per each)</span>
                        </TableHead>
                        <TableHead className="text-center">
                            Tax%{" "}
                            <span className="block text-xs">(per each)</span>
                        </TableHead>
                        <TableHead className="text-center">
                            Discount%{" "}
                            <span className="block text-xs">(per each)</span>
                        </TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoiceItems.map((product, index) => {
                        const tax = calculateTax(
                            product.price,
                            product.quantity,
                            product.taxRate
                        );
                        const discount = calculateDiscount(
                            product.price,
                            product.quantity,
                            product.discountRate
                        );
                        const total = calculateTotal(
                            product.price,
                            product.quantity,
                            tax,
                            discount
                        );

                        return (
                            <TableRow key={index + 1}>
                                <TableCell className="text-center">{`#${index + 1}`}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell className="text-right">
                                    {product.quantity}
                                </TableCell>
                                <TableCell className="text-right">
                                    {formatCurrency(product.price)}
                                </TableCell>
                                <TableCell className="text-right">
                                    {product.taxRate === 0
                                        ? "-"
                                        : formatPercentage(product.taxRate)}
                                </TableCell>
                                <TableCell className="text-right">
                                    {product.discountRate === 0
                                        ? "-"
                                        : formatPercentage(
                                              product.discountRate
                                          )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs text-muted-foreground">{`Base: ${formatCurrency(
                                            product.price * product.quantity
                                        )}`}</p>
                                        <p className="text-xs text-muted-foreground">{`+ Tax: ${formatCurrency(
                                            tax
                                        )}`}</p>
                                        <p className="text-xs text-muted-foreground">{`- Discount: ${formatCurrency(
                                            discount
                                        )}`}</p>
                                        <Separator className="my-1 w-1/2" />
                                        <p className="text-sm font-medium">
                                            {formatCurrency(total)}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Total</TableCell>
                        <TableCell className="text-right">
                            <div className="flex flex-col items-end">
                                <p className="text-xs text-muted-foreground">{`Base: ${formatCurrency(
                                    totalBasePrice
                                )}`}</p>
                                <p className="text-xs text-muted-foreground">{`+ Tax: ${formatCurrency(
                                    totalTax
                                )}`}</p>
                                <p className="text-xs text-muted-foreground">{`- Discount: ${formatCurrency(
                                    totalDiscount
                                )}`}</p>
                                <Separator className="my-1 w-1/2" />
                                <p className="text-sm font-medium">
                                    {formatCurrency(grandTotal)}
                                </p>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};
