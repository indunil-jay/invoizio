import { IEmailService } from "@/src/application/services/email-service.interface";
import { EmailService } from "@/src/infastructure/services/email.service";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IEmailService>(DI_SYMBOLS.IEmailService).to(EmailService);
};

export const EmailModule = new ContainerModule(initializeModule);
