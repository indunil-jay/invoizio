import { createContext, useContext, useState } from "react";
import { Product } from "../_components/add-product-form";
import { calculateDiscount, calculateTax } from "../_lib/utils";

// Define the context value type
interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  totalBasePrice: number;
  totalTax: number;
  totalDiscount: number;
  grandTotal: number;
}

// Create the context
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const totalBasePrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const totalTax = products.reduce(
    (sum, product) =>
      sum + calculateTax(product.price, product.quantity, product.taxRate),
    0
  );
  const totalDiscount = products.reduce(
    (sum, product) =>
      sum +
      calculateDiscount(product.price, product.quantity, product.discountRate),
    0
  );
  const grandTotal = totalBasePrice + totalTax - totalDiscount;

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        totalBasePrice,
        totalTax,
        totalDiscount,
        grandTotal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for consuming context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
