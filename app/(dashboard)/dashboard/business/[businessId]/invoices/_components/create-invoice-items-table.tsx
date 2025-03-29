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
import { Trash2 } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export const CreateInvoiceItemsTable = () => {
    const {
        grandTotal,
        invoiceItems,
        totalBasePrice,
        totalDiscount,
        totalTax,
        removeItem,
    } = useInvoiceItems();

    return (
        <div className="overflow-x-auto w-full relative">
            <Table>
                <TableHeader>
                    <TableRow className="text-xs">
                        <TableHead className="text-center">ID</TableHead>
                        <TableHead className="text-left">
                            Product Name
                        </TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">
                            Price (each)
                        </TableHead>
                        <TableHead className="text-center">
                            Tax% (each)
                        </TableHead>
                        <TableHead className="text-center">
                            Discount% (each)
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
                            <TableRow key={product.id} className="text-sm">
                                <TableCell className="text-center">{`#${index + 1}`}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell className="text-right">
                                    {product.quantity}
                                </TableCell>
                                <TableCell className="text-right">
                                    {formatCurrency(product.price)}
                                </TableCell>
                                <TableCell className="text-center">
                                    {product.taxRate === 0
                                        ? "-"
                                        : formatPercentage(product.taxRate)}
                                </TableCell>
                                <TableCell className="text-center">
                                    {product.discountRate === 0
                                        ? "-"
                                        : formatPercentage(
                                              product.discountRate
                                          )}
                                </TableCell>
                                <TableCell className="text-right text-xs">
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs text-muted-foreground">{`Base: ${formatCurrency(product.price * product.quantity)}`}</p>
                                        <p className=" text-xs text-muted-foreground">{`+ Tax: ${formatCurrency(tax)}`}</p>
                                        <p className="text-xs text-muted-foreground">{`- Discount: ${formatCurrency(discount)}`}</p>
                                        <Separator className="my-1 w-1/2" />
                                        <p className="font-medium">
                                            {formatCurrency(total)}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell className="text-left w-[12px]">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(product.id!)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow className="text-xs font-medium">
                        <TableCell colSpan={6}>Total</TableCell>
                        <TableCell className="text-right">
                            <div className="flex flex-col items-end">
                                <p className=" text-muted-foreground">{`Base: ${formatCurrency(totalBasePrice)}`}</p>
                                <p className=" text-muted-foreground">{`+ Tax: ${formatCurrency(totalTax)}`}</p>
                                <p className="text-muted-foreground">{`- Discount: ${formatCurrency(totalDiscount)}`}</p>
                                <Separator className="my-1 w-1/2" />
                                <p className=" font-medium">
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
