import { createInvoiceSchema } from "@/src/application/dtos/invoice.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { updateInvoiceUseCase } from "@/src/application/use-cases/invoices/update-invoice.use-case";

export const updateInvoiceController = async (input: unknown) => {
  const { data, error: inputParseError } = createInvoiceSchema.safeParse(input);

  console.log({ input });

  if (inputParseError) {
    console.log(inputParseError);
    throw new BadRequestError(`validation-error ${inputParseError.errors}`);
  }

  return await updateInvoiceUseCase.execute(data);
};
