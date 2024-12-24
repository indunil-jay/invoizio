import { CreateInvoiceDTO } from "@/src/application/dtos/invoice.dto";

export const createInvoiceUseCase = async (data: CreateInvoiceDTO) => {
  //  check the session is valid
  console.log(data);
};
