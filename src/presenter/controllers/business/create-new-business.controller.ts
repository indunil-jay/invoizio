import {
  CreateBusinessDTO,
  createBusinessSchema,
} from "@/src/application/dtos/business.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { createNewBusinessUseCase } from "@/src/application/use-cases/business/create-new-business.use-case";

export const createNewBusinessController = async (input: CreateBusinessDTO) => {
  const { data, error: inputParseError } =
    createBusinessSchema.safeParse(input);

  if (inputParseError) {
    throw new BadRequestError(`validation error, ${inputParseError.message}`);
  }

  return await createNewBusinessUseCase.execute(data);
};
