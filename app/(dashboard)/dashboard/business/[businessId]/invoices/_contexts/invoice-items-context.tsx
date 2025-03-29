import { createContext, useContext, useState } from "react";
import { calculateDiscount, calculateTax } from "../_utils/calculations";
import { InvoiceItem } from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_utils/types";

// Define the context value type
interface InvoiceContextType {
    invoiceItems: InvoiceItem[];
    setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
    removeItem(id: string): void;
    totalBasePrice: number;
    totalTax: number;
    totalDiscount: number;
    grandTotal: number;
}

// Create the context
export const InvoiceItemsContext = createContext<
    InvoiceContextType | undefined
>(undefined);

interface InvoiceItemsProviderProps {
    children: React.ReactNode;
}

export const InvoiceItemsProvider = ({
    children,
}: InvoiceItemsProviderProps) => {
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

    const totalBasePrice = invoiceItems.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );
    const totalTax = invoiceItems.reduce(
        (sum, product) =>
            sum +
            calculateTax(product.price, product.quantity, product.taxRate),
        0
    );
    const totalDiscount = invoiceItems.reduce(
        (sum, product) =>
            sum +
            calculateDiscount(
                product.price,
                product.quantity,
                product.discountRate
            ),
        0
    );
    const grandTotal = totalBasePrice + totalTax - totalDiscount;

    const removeItem = (id: string) => {
        setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
    };

    return (
        <InvoiceItemsContext.Provider
            value={{
                invoiceItems,
                setInvoiceItems,
                totalBasePrice,
                totalTax,
                totalDiscount,
                grandTotal,
                removeItem,
            }}
        >
            {children}
        </InvoiceItemsContext.Provider>
    );
};

// Custom hook for consuming context
export const useInvoiceItems = () => {
    const context = useContext(InvoiceItemsContext);
    if (!context) {
        throw new Error(
            "useInvoiceItems must be used within a InvoiceItemsProvider"
        );
    }
    return context;
};
