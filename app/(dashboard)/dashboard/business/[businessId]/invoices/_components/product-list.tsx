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

export const ProductTable = ({ products }: { products: Product[] }) => {
  const calculateTax = (price: number, quantity: number, taxRate: number) =>
    ((price * taxRate) / 100) * quantity;

  const calculateTotal = (price: number, quantity: number, tax: number) =>
    price * quantity + tax;

  const totalBasePrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const totalTax = products.reduce(
    (sum, product) =>
      sum + calculateTax(product.price, product.quantity, product.taxRate),
    0
  );

  const grandTotal = totalBasePrice + totalTax;

  return (
    <div className="overflow-x-auto w-full relative">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className=" text-center">ID</TableHead>
            <TableHead className=" text-left">Product Name</TableHead>
            <TableHead className=" text-right">Qty</TableHead>
            <TableHead className=" text-center">
              Price <span className="block text-xs">(per each)</span>
            </TableHead>
            <TableHead className=" text-center">
              Tax% <span className="block text-xs">(per each)</span>
            </TableHead>
            <TableHead className=" text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => {
            const tax = calculateTax(
              product.price,
              product.quantity,
              product.taxRate
            );
            const total = calculateTotal(product.price, product.quantity, tax);

            return (
              <TableRow key={index + 1}>
                <TableCell className="text-center">{`#${index + 1}`}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
                <TableCell className="text-right">{`$${product.price.toFixed(
                  2
                )}`}</TableCell>
                <TableCell className="text-right">{`${product.taxRate.toFixed(
                  2
                )}%`}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-muted-foreground">{`Base: $${(
                      product.price * product.quantity
                    ).toFixed(2)}`}</p>
                    <p className="text-xs text-muted-foreground">{`+ Tax: $${tax.toFixed(
                      2
                    )}`}</p>
                    <Separator className="my-1 w-1/2" />
                    <p className="text-sm font-medium">{`$${total.toFixed(
                      2
                    )}`}</p>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              <div className="flex flex-col items-end">
                <p className="text-xs text-muted-foreground">{`Base: $${totalBasePrice.toFixed(
                  2
                )}`}</p>
                <p className="text-xs text-muted-foreground">{`+ Tax: $${totalTax.toFixed(
                  2
                )}`}</p>
                <Separator className="my-1 w-1/2" />
                <p className="text-sm font-medium">{`$${grandTotal.toFixed(
                  2
                )}`}</p>
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

      {products.length > 0 && <ProductTable products={products} />}
    </>
  );
};
