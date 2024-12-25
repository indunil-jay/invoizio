import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "../authentication/check-valid-session";

export const getAllInvoicesByBusinessIdUseCase = async (businessId: string) => {
  //di
  const invoicesRepository = getInjection("IInvoiceRepository");

  //check valida session
  await checkValidSessionUseCase.execute();

  const invoicesDocumentList = await invoicesRepository.getAllByBusinessId(
    businessId
  );

  return invoicesDocumentList;
};
