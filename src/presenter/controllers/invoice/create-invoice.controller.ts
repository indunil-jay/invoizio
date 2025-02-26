import { createInvoiceSchema } from "@/src/application/dtos/invoice.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { createInvoiceUseCase } from "@/src/application/use-cases/invoices/create-invoice.use-case";

export const createInvoiceController = async (input: unknown) => {
  console.log(input);
  const { data, error: inputParseError } = createInvoiceSchema.safeParse(input);

  if (inputParseError) {
    throw new BadRequestError(`validation-error ${inputParseError.errors}`);
  }

  return await createInvoiceUseCase(data);
};
