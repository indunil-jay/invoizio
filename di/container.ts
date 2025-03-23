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

import { UserSignedUpEventHandlerModule } from "@/di/modules/handlers/user-signed-up.event.handler.module";
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
import { ResendVerifyEmailEventHandlerModule } from "@/di/modules/handlers/resend-verify-email.event-handler.module";
import { PasswordResetTokenFactoryModule } from "./modules/factrories/password-reset-token-factory.module";
import { SendResetPasswordEmailEventHandlerModule } from "./modules/handlers/send-reset-password-email.event-handler.module";
import { PasswordResetedEventHandlerModule } from "./modules/handlers/password-reseted.event-handler.module";
import { EmailUpdatedEventHandlerModule } from "./modules/handlers/email-updated.event-handler.module";
import { PasswordChangedEventHandlerModule } from "./modules/handlers/password-changed.event-handler.module";
import { CloudinaryServiceModule } from "./modules/services/cloudinary-service.module";
import { UserCoverImageFactoryModule } from "./modules/factrories/user-cover-image-factory.module";
import { UserCoverImageRepositoryModule } from "./modules/repositories/user-cover-image-repository.module";
import { UserProfileImageFactoryModule } from "./modules/factrories/user-profile-image-factory.module";
import { UserProfileImageRepositoryModule } from "./modules/repositories/user-profile-image-repository.module";
import { BusinessProfileImageFactoryModule } from "./modules/factrories/business-profile-image-factory.module";
import { BusinessProfileImageRepositoryModule } from "./modules/repositories/business-profile-image-repository.module";
import { BusinessFactoryModule } from "./modules/factrories/business-factory.module";
import { BusinessAddressFactoryModule } from "./modules/factrories/business-address-factory.module";
import { ClientFactoryModule } from "./modules/factrories/client-factory.module";
import { ClientAddressFactoryModule } from "./modules/factrories/client-address-factory.module";
import { InvoiceItemFactoryModule } from "./modules/factrories/invoice-item-factory.module";
import { InvoiceFactoryModule } from "./modules/factrories/invoice-factory.module";
import { InvoicePaymentReminderSentEventHandlerModule } from "./modules/handlers/invoice-payment-reminder-sent.event-handler.module";

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
    ApplicationContainer.load(UserCoverImageFactoryModule);
    ApplicationContainer.load(UserProfileImageFactoryModule);
    ApplicationContainer.load(BusinessProfileImageFactoryModule);
    ApplicationContainer.load(BusinessFactoryModule);
    ApplicationContainer.load(BusinessAddressFactoryModule);
    ApplicationContainer.load(ClientFactoryModule);
    ApplicationContainer.load(ClientAddressFactoryModule);
    ApplicationContainer.load(InvoiceFactoryModule);
    ApplicationContainer.load(InvoiceItemFactoryModule);

    //handlers
    ApplicationContainer.load(UserSignedUpEventHandlerModule);
    ApplicationContainer.load(ResendVerifyEmailEventHandlerModule);
    ApplicationContainer.load(SendResetPasswordEmailEventHandlerModule);
    ApplicationContainer.load(PasswordResetedEventHandlerModule);
    ApplicationContainer.load(EmailUpdatedEventHandlerModule);
    ApplicationContainer.load(PasswordChangedEventHandlerModule);
    ApplicationContainer.load(InvoicePaymentReminderSentEventHandlerModule);

    //services
    ApplicationContainer.load(AuthenticationServiceModule);
    ApplicationContainer.load(EmailServiceModule);
    ApplicationContainer.load(HashingServiceModule);
    ApplicationContainer.load(TokenGeneratorServiceModule);
    ApplicationContainer.load(TransactionManagerServiceModule);
    ApplicationContainer.load(CloudinaryServiceModule);

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
    ApplicationContainer.load(UserCoverImageRepositoryModule);
    ApplicationContainer.load(UserProfileImageRepositoryModule);
    ApplicationContainer.load(BusinessProfileImageRepositoryModule);

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
    ApplicationContainer.unload(UserCoverImageFactoryModule);
    ApplicationContainer.unload(UserProfileImageFactoryModule);
    ApplicationContainer.unload(BusinessProfileImageFactoryModule);
    ApplicationContainer.unload(BusinessFactoryModule);
    ApplicationContainer.unload(BusinessAddressFactoryModule);
    ApplicationContainer.unload(ClientFactoryModule);
    ApplicationContainer.unload(ClientAddressFactoryModule);

    //handlers
    ApplicationContainer.unload(UserSignedUpEventHandlerModule);
    ApplicationContainer.unload(ResendVerifyEmailEventHandlerModule);
    ApplicationContainer.unload(SendResetPasswordEmailEventHandlerModule);
    ApplicationContainer.unload(PasswordResetedEventHandlerModule);
    ApplicationContainer.unload(EmailUpdatedEventHandlerModule);
    ApplicationContainer.unload(PasswordChangedEventHandlerModule);
    ApplicationContainer.unload(InvoicePaymentReminderSentEventHandlerModule);

    //services
    ApplicationContainer.unload(AuthenticationServiceModule);
    ApplicationContainer.unload(EmailServiceModule);
    ApplicationContainer.unload(HashingServiceModule);
    ApplicationContainer.unload(TokenGeneratorServiceModule);
    ApplicationContainer.unload(TransactionManagerServiceModule);
    ApplicationContainer.unload(CloudinaryServiceModule);

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
    ApplicationContainer.unload(UserCoverImageRepositoryModule);
    ApplicationContainer.unload(UserProfileImageRepositoryModule);
    ApplicationContainer.unload(BusinessProfileImageRepositoryModule);
};
initializeContainer();

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K
): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
