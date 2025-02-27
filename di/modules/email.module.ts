import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IEmailService } from "@/src/shared-infrastructure/resend/email.service.interface";
import { EmailService } from "@/src/shared-infrastructure/resend/email.service";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IEmailService>(DI_SYMBOLS.IEmailService).to(EmailService);
};

export const EmailModule = new ContainerModule(initializeModule);
