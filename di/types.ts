import { IUserSignedUpEventHandler } from "@/src/iam/application/handlers/user-signed-up.event-handler";
import { IUserRepository } from "@/src/iam/application/repositories/user.repository";
import { IAuthenticationService } from "@/src/iam/application/services/authentication.service";
import { IHashingService } from "@/src/iam/application/services/hashing.service";
import { IEmailService } from "@/src/shared/resend/application/email.service.interface";
import { IEventBus } from "@/src/shared/event-store/event-bus.interface";
import { ITokenGenerateService } from "@/src/iam/application/services/token-generate.service";
import { IVerificationTokenRepository } from "@/src/iam/application/repositories/verification-token.repository";
import { IVerificationTokenFactory } from "@/src/iam/domain/factories/verification-token.factory";
import { IUserFactory } from "@/src/iam/domain/factories/user.factory";
import { ITransactionManagerService } from "@/src/shared/database-transaction/transaction-manager.service.interface";
import { IResendVerifyEmailEventHandler } from "@/src/iam/application/handlers/resend-verify-email.event-handler";
import { IPasswordResetTokenFactory } from "@/src/iam/domain/factories/password-reset-token.factory";
import { IPasswordResetTokenRepository } from "@/src/iam/application/repositories/password-reset-token.repository";
import { ISendResetPasswordEmailEventHandler } from "@/src/iam/application/handlers/send-reset-password-email.event.handler";
import { IPasswordResetedEventHandler } from "@/src/iam/application/handlers/password-reseted-event-handler";
import { IAccountRepository } from "@/src/iam/application/repositories/provider-account.repository";
import { IEmailUpdatedEventHandler } from "@/src/iam/application/handlers/email-updated.event-handler";
import { IPasswordChangedEventHandler } from "@/src/iam/application/handlers/password-changed.event-handler";
import { ICloudinaryService } from "@/src/shared/cloudinary/cloudinary.service.interface";
import { IUserCoverImageFactory } from "@/src/iam/domain/factories/user-cover-image.factory";
import { IUserCoverImageRepository } from "@/src/iam/application/repositories/user-cover-image.repository";
import { IUserProfileImageFactory } from "@/src/iam/domain/factories/user-profile-image.factory";
import { IUserProfileImageRepository } from "@/src/iam/application/repositories/user-profile-image.repository";
import { IBusinessProfileImageFactory } from "@/src/business/domain/factories/business-profile-image.factory";
import { IBusinessProfileImageRepository } from "@/src/business/application/repositories/business-profile-image.repository";
import { IBusinessRepository } from "@/src/business/application/repositories/business.repository";
import { IBusinessAddressRepository } from "@/src/business/application/repositories/business-address.repository";
import { IBusinessFactory } from "@/src/business/domain/factories/business.factory";
import { IBusinessAddressFactory } from "@/src/business/domain/factories/business-address-factory";
import { IClientFactory } from "@/src/client-user/domain/factories/client-factory";
import { IClientAddressFactory } from "@/src/client-user/domain/factories/client-address-factory";
import { IClientRepository } from "@/src/client-user/application/repositories/client-repository";
import { IClientAddressRepository } from "@/src/client-user/application/repositories/client-address-repository";
import { IInvoiceFactory } from "@/src/invoice/domain/factories/invoice-factory";
import { IInvoiceItemFactory } from "@/src/invoice/domain/factories/invoice-item.factory";
import { IInvoiceItemRepository } from "@/src/invoice/application/repositories/invoice-item.repository";
import { IInvoiceRepository } from "@/src/invoice/application/repositories/invoice.repository";
import { IInvoicePaymentReminderSentEventHandler } from "@/src/invoice/application/handlers/invoice-payment-reminder-sent.event-handler";
import { IInvoiceCreatedEventHandler } from "@/src/invoice/application/handlers/invoice-created.event-handler";

export const DI_SYMBOLS = {
    // Services
    IHashingService: Symbol.for("IHashingService"),
    IAuthenticationService: Symbol.for("IAuthenticationService"),
    ITokenGenerateService: Symbol.for("ITokenGenerateService"),
    IEmailService: Symbol.for("IEmailService"),
    ITransactionManagerService: Symbol.for("ITransactionManagerService"),
    ICloudinaryService: Symbol.for("ICloudinaryService"),

    // Repositories
    IUserRepository: Symbol.for("IUserRepository"),
    IVerificationTokenRepository: Symbol.for("IVerificationTokenRepository"),
    IPasswordResetTokenRepository: Symbol.for("IPasswordResetTokenRepository"),
    IAccountRepository: Symbol.for("IAccountRepository"),
    IBusinessRepository: Symbol.for("IBusinessRepository"),
    IBusinessAddressRepository: Symbol.for("IBusinessAddressRepository"),
    IClientRepository: Symbol.for("IClientRepository"),
    IClientAddressRepository: Symbol.for("IClientAddressRepository"),
    IInvoiceRepository: Symbol.for("IInvoiceRepository"),
    IInvoiceItemRepository: Symbol.for("IInvoiceItemRepository"),
    IUserCoverImageRepository: Symbol.for("IUserCoverImageRepository"),
    IUserProfileImageRepository: Symbol.for("IUserProfileImageRepository"),
    IBusinessProfileImageRepository: Symbol.for(
        "IBusinessProfileImageRepository"
    ),

    //Handlers
    IUserSignedUpEventHandler: Symbol.for("IUserSignedUpEventHandler"),
    IResendVerifyEmailEventHandler: Symbol.for(
        "IResendVerifyEmailEventHandler"
    ),
    ISendResetPasswordEmailEventHandler: Symbol.for(
        "ISendResetPasswordEmailEventHandler"
    ),
    IPasswordResetedEventHandler: Symbol.for("IPasswordResetedEventHandler"),
    IEmailUpdatedEventHandler: Symbol.for("IEmailUpdatedEventHandler"),
    IPasswordChangedEventHandler: Symbol.for("IPasswordChangedEventHandler"),
    IInvoicePaymentReminderSentEventHandler: Symbol.for(
        "IInvoicePaymentReminderSentEventHandler"
    ),

    IInvoiceCreatedEventHandler: Symbol.for("IInvoiceCreatedEventHandler"),

    //Event Bus
    IEventBus: Symbol.for("IEventBus"),

    //factories
    IVerificationTokenFactory: Symbol.for("IVerificationTokenFactory"),
    IUserFactory: Symbol.for("IUserFactory"),
    IPasswordResetTokenFactory: Symbol.for("IPasswordResetTokenFactory"),
    IUserCoverImageFactory: Symbol.for("IUserCoverImageFactory"),
    IUserProfileImageFactory: Symbol.for("IUserProfileImageFactory"),
    IBusinessProfileImageFactory: Symbol.for("IBusinessProfileImageFactory"),
    IBusinessFactory: Symbol.for("IBusinessFactory"),
    IBusinessAddressFactory: Symbol.for("IBusinessAddressFactory"),
    IClientFactory: Symbol.for("IClientFactory"),
    IClientAddressFactory: Symbol.for("IClientAddressFactory"),
    IInvoiceFactory: Symbol.for("IInvoiceFactory"),
    IInvoiceItemFactory: Symbol.for("IInvoiceItemFactory"),
};

export interface DI_RETURN_TYPES {
    // Services
    IHashingService: IHashingService;
    IAuthenticationService: IAuthenticationService;
    ITokenGenerateService: ITokenGenerateService;
    IEmailService: IEmailService;
    ITransactionManagerService: ITransactionManagerService;
    ICloudinaryService: ICloudinaryService;

    // Repositories
    IUserRepository: IUserRepository;
    IVerificationTokenRepository: IVerificationTokenRepository;
    IPasswordResetTokenRepository: IPasswordResetTokenRepository;
    IAccountRepository: IAccountRepository;
    IUserCoverImageRepository: IUserCoverImageRepository;
    IUserProfileImageRepository: IUserProfileImageRepository;
    IBusinessProfileImageRepository: IBusinessProfileImageRepository;
    IBusinessRepository: IBusinessRepository;
    IBusinessAddressRepository: IBusinessAddressRepository;
    IClientRepository: IClientRepository;
    IClientAddressRepository: IClientAddressRepository;
    IInvoiceRepository: IInvoiceRepository;
    IInvoiceItemRepository: IInvoiceItemRepository;

    //Handlers
    IUserSignedUpEventHandler: IUserSignedUpEventHandler;
    IResendVerifyEmailEventHandler: IResendVerifyEmailEventHandler;
    ISendResetPasswordEmailEventHandler: ISendResetPasswordEmailEventHandler;
    IPasswordResetedEventHandler: IPasswordResetedEventHandler;
    IEmailUpdatedEventHandler: IEmailUpdatedEventHandler;
    IPasswordChangedEventHandler: IPasswordChangedEventHandler;
    IInvoicePaymentReminderSentEventHandler: IInvoicePaymentReminderSentEventHandler;
    IInvoiceCreatedEventHandler: IInvoiceCreatedEventHandler;

    //event bus
    IEventBus: IEventBus;

    //factories
    IVerificationTokenFactory: IVerificationTokenFactory;
    IPasswordResetTokenFactory: IPasswordResetTokenFactory;
    IUserFactory: IUserFactory;
    IUserCoverImageFactory: IUserCoverImageFactory;
    IUserProfileImageFactory: IUserProfileImageFactory;
    IBusinessProfileImageFactory: IBusinessProfileImageFactory;
    IBusinessFactory: IBusinessFactory;
    IBusinessAddressFactory: IBusinessAddressFactory;
    IClientFactory: IClientFactory;
    IClientAddressFactory: IClientAddressFactory;
    IInvoiceFactory: IInvoiceFactory;
    IInvoiceItemFactory: IInvoiceItemFactory;
}
