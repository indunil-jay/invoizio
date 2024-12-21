export const calculateTax = (
  price: number,
  quantity: number,
  taxRate: number
) => ((price * taxRate) / 100) * quantity;

export const calculateDiscount = (
  price: number,
  quantity: number,
  discountRate: number
) => (price * quantity * discountRate) / 100;

export const calculateTotal = (
  price: number,
  quantity: number,
  tax: number,
  discount: number
) => price * quantity + tax - discount;

export const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const formatNumber = (value: number): string => {
  return value.toFixed(2);
};
