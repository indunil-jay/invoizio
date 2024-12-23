import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { AddProductForm, Product } from "./add-product-form";
import { Separator } from "@/app/_components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  calculateDiscount,
  calculateTax,
  calculateTotal,
  formatCurrency,
  formatPercentage,
} from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_lib/utils";
import { useProducts } from "../_contexts/product.context";

export const ProductTable = () => {
  const { grandTotal, products, totalBasePrice, totalDiscount, totalTax } =
    useProducts();

  return (
    <div className="overflow-x-auto w-full relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-left">Product Name</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-center">
              Price <span className="block text-xs">(per each)</span>
            </TableHead>
            <TableHead className="text-center">
              Tax% <span className="block text-xs">(per each)</span>
            </TableHead>
            <TableHead className="text-center">
              Discount% <span className="block text-xs">(per each)</span>
            </TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => {
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
                <TableCell>{product.productName}</TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
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
                    : formatPercentage(product.discountRate)}
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

export const ProductsList = ({
  products,
  onAddProduct,
}: {
  products: Product[];
  onAddProduct: (product: Product) => void;
}) => {
  const [isOpenProductForm, setIsOpenProductForm] = useState(false);
  const handleClose = () => setIsOpenProductForm(false);
  return (
    <>
      <div className="flex items-start justify-between">
        <p className="text-xs text-muted-foreground ">
          Add product details individually by clicking the button
        </p>
        <Popover onOpenChange={setIsOpenProductForm} open={isOpenProductForm}>
          <PopoverTrigger asChild>
            <Button size={"sm"}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4 text-primary-foreground " />
              </div>

              <div className="font-medium text-primary-foreground ">
                Add Product
              </div>
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end">
            <AddProductForm
              onAddProduct={onAddProduct}
              handleClose={handleClose}
            />
          </PopoverContent>
        </Popover>
      </div>

      {products.length > 0 && <ProductTable />}
    </>
  );
};
