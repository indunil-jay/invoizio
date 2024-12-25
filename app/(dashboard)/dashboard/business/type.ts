export type Business = {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Address = {
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  postalCode: string;
};

export type BusinessWithAddress = {
  address: Address;
} & Business;

export type Invoice = {
  id: string;
  clientId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  businessId: string;
  issueDate: string | Date;
  dueDate: string | Date;
  description: string;
  statusId: number;
  totalPrice: string;
  totalBasePrice: string;
  totalTax: string | null;
  totalDiscount: string | null;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InvoiceItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  invoiceId: string;
  productName: string;
  quantity: number;
  price: string;
  taxRate: string | null;
  discountRate: string | null;
};

export type InvoiceStatus = {
  id: number;
  status: string;
};

export type InvoiceWithDetails = {
  client: Client;
  invoiceItems: InvoiceItem[];
  status: InvoiceStatus;
} & Invoice;

export enum INVOICE_STATUS {
  "PENDING" = 1,
  "PAID",
  "CANCELLED",
  "EXPIRED",
}
