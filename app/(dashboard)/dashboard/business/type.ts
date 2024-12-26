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

export type ClientWithAddress = {
  address: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clientId: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    postalCode: string;
  };
} & Client;

export type InvoiceItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  invoiceId: string;
  name: string;
  quantity: number;
  price: number;
  taxRate: number | null;
  discountRate: number | null;
};

export type InvoiceStatus = {
  id: number;
  status: string;
};

export type InvoiceWithDetails = {
  client: ClientWithAddress;
  invoiceItems: InvoiceItem[];
  status: InvoiceStatus;
} & Invoice;

export enum INVOICE_STATUS {
  "PENDING" = 1,
  "PAID",
  "CANCELLED",
  "EXPIRED",
}
