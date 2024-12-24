export type Business = {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  address: {
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    postalCode: string;
  };
};
