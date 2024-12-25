"use server";
import { executeQuery } from "@/app/_lib/execute.queries";
import { getAllInvoicesByBusinessIdController } from "@/src/interface-adapter/controllers/invoice/get-all-invoices-by-business-id.controller";

export const getAllInvoicesByBusinessId = (businessId: string) => {
  return executeQuery({
    queryFn: async () => await getAllInvoicesByBusinessIdController(businessId),
  });
};
