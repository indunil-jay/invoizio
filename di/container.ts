import { Container } from "inversify";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/di/types";
import { eventBusModule } from "@/di/modules/event-bus/event-bus.module";

import { HashingServiceModule } from "@/di/modules/services/hashing-service.module";
import { AuthenticationServiceModule } from "@/di/modules/services/authentication-service.module";
import { TokenGeneratorServiceModule } from "@/di/modules/services/token-generator-service.module";
import { EmailServiceModule } from "@/di/modules/services/email-service.module";
import { TransactionManagerServiceModule } from "@/di/modules/services/transaction-manager-service.module";

import { VerificationTokenFactoryModule } from "@/di/modules/factrories/verification-token-factory.module";
import { UserFactoryModule } from "@/di/modules/factrories/user-factory.module";

import { UserSignedUpHandlerModule } from "@/di/modules/handlers/user-signed-up-handler.module";
import { UserRepositoryModule } from "@/di/modules/repositories/user-repository.module";
import { VerificationTokenRepositoryModule } from "@/di/modules/repositories/verification-token-repository.module";
import { PasswordResetTokenRepositoryModule } from "@/di/modules/repositories/password-reset-token-repository.module";
import { AccountRepositoryModule } from "@/di/modules/repositories/account-repository.module";
import { BusinessRepositoryModule } from "@/di/modules/repositories/business-repository.module";
import { BusinessAddressRepositoryModule } from "@/di/modules/repositories/business-address-repository.module";
import { ClientRepositoryModule } from "@/di/modules/repositories/client-repository.module";
import { ClientAddressRepositoryModule } from "@/di/modules/repositories/client-address-repository.module";
import { InvoiceRepositoryModule } from "@/di/modules/repositories/invoice-repository.module";
import { InvoiceItemsRepositoryModule } from "@/di/modules/repositories/invoice-items-repository.module";
import { ActivityRepositoryModule } from "@/di/modules/repositories/activity-repository.module";
import { ResendVerifyEmailHandlerModule } from "@/di/modules/handlers/resend-verify-email-handler.module";
import { PasswordResetTokenFactoryModule } from "./modules/factrories/password-reset-token-factory.module";
import { SendResetPasswordEmailEventHandlerModule } from "./modules/handlers/send-reset-password-email.event-handler.module";

const ApplicationContainer = new Container({
    defaultScope: "Singleton",
});

export const initializeContainer = () => {
    //event bus
    ApplicationContainer.load(eventBusModule);

    //factories
    ApplicationContainer.load(VerificationTokenFactoryModule);
    ApplicationContainer.load(UserFactoryModule);
    ApplicationContainer.load(PasswordResetTokenFactoryModule);

    //handlers
    ApplicationContainer.load(UserSignedUpHandlerModule);
    ApplicationContainer.load(ResendVerifyEmailHandlerModule);
    ApplicationContainer.load(SendResetPasswordEmailEventHandlerModule);
    //services
    ApplicationContainer.load(AuthenticationServiceModule);
    ApplicationContainer.load(EmailServiceModule);
    ApplicationContainer.load(HashingServiceModule);
    ApplicationContainer.load(TokenGeneratorServiceModule);
    ApplicationContainer.load(TransactionManagerServiceModule);

    //repositories
    ApplicationContainer.load(UserRepositoryModule);
    ApplicationContainer.load(VerificationTokenRepositoryModule);
    ApplicationContainer.load(PasswordResetTokenRepositoryModule);
    ApplicationContainer.load(AccountRepositoryModule);
    ApplicationContainer.load(BusinessRepositoryModule);
    ApplicationContainer.load(BusinessAddressRepositoryModule);
    ApplicationContainer.load(ClientRepositoryModule);
    ApplicationContainer.load(ClientAddressRepositoryModule);
    ApplicationContainer.load(InvoiceRepositoryModule);
    ApplicationContainer.load(InvoiceItemsRepositoryModule);
    ApplicationContainer.load(ActivityRepositoryModule);

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@/src/shared/event-store/event-subscribers");
};

export const destroyContainer = () => {
    //event bus
    ApplicationContainer.unload(eventBusModule);

    //factories
    ApplicationContainer.unload(VerificationTokenFactoryModule);
    ApplicationContainer.unload(UserFactoryModule);
    ApplicationContainer.unload(PasswordResetTokenFactoryModule);

    //handlers
    ApplicationContainer.unload(UserSignedUpHandlerModule);
    ApplicationContainer.unload(ResendVerifyEmailHandlerModule);
    ApplicationContainer.unload(SendResetPasswordEmailEventHandlerModule);

    //services
    ApplicationContainer.unload(AuthenticationServiceModule);
    ApplicationContainer.unload(EmailServiceModule);
    ApplicationContainer.unload(HashingServiceModule);
    ApplicationContainer.unload(TokenGeneratorServiceModule);
    ApplicationContainer.unload(TransactionManagerServiceModule);

    //repositories
    ApplicationContainer.unload(UserRepositoryModule);
    ApplicationContainer.unload(VerificationTokenRepositoryModule);
    ApplicationContainer.unload(PasswordResetTokenRepositoryModule);
    ApplicationContainer.unload(AccountRepositoryModule);
    ApplicationContainer.unload(BusinessRepositoryModule);
    ApplicationContainer.unload(BusinessAddressRepositoryModule);
    ApplicationContainer.unload(ClientRepositoryModule);
    ApplicationContainer.unload(ClientAddressRepositoryModule);
    ApplicationContainer.unload(InvoiceRepositoryModule);
    ApplicationContainer.unload(InvoiceItemsRepositoryModule);
    ApplicationContainer.unload(ActivityRepositoryModule);
};
initializeContainer();

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K
): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
