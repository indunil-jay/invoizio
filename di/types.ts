import { IAccountRepository } from "@/src/application/repositories/account-repository.interface";
import { IActivityRepository } from "@/src/application/repositories/activities-repository.interface";
import { IBusinessAddressRepository } from "@/src/application/repositories/business-address-repository.interface";
import { IBusinessRepository } from "@/src/application/repositories/business-repository.interface";
import { IClientAddressRepository } from "@/src/application/repositories/client-address-repository.interface";
import { IClientRepository } from "@/src/application/repositories/client-repository.interface";
import { IInvoiceItemsRepository } from "@/src/application/repositories/invoice-item-repository.interface";
import { IInvoiceRepository } from "@/src/application/repositories/invoice-repository.interface";
import { IPasswordResetTokenRepository } from "@/src/application/repositories/password-reset-token-repository.interface";

import { IUserSignedUpHandler } from "@/src/iam/application/handlers/user-signed-up.handler";

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

export const DI_SYMBOLS = {
    // Services
    IHashingService: Symbol.for("IHashingService"),
    IAuthenticationService: Symbol.for("IAuthenticationService"),
    ITokenGenerateService: Symbol.for("ITokenGenerateService"),
    IEmailService: Symbol.for("IEmailService"),
    ITransactionManagerService: Symbol.for("ITransactionManagerService"),
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
    IInvoiceItemsRepository: Symbol.for("IInvoiceItemsRepository"),
    IActivityRepository: Symbol.for("IActivityRepository"),

    //Handlers
    IUserSignedUpHandler: Symbol.for("IUserSignedUpHandler"),

    //Event Bus
    IEventBus: Symbol.for("IEventBus"),

    //factories
    IVerificationTokenFactory: Symbol.for("IVerificationTokenFactory"),
    IUserFactory: Symbol.for("IUserFactory"),
};

export interface DI_RETURN_TYPES {
    // Services
    IHashingService: IHashingService;
    IAuthenticationService: IAuthenticationService;
    ITokenGenerateService: ITokenGenerateService;
    IEmailService: IEmailService;
    ITransactionManagerService: ITransactionManagerService;

    // Repositories
    IUserRepository: IUserRepository;
    IVerificationTokenRepository: IVerificationTokenRepository;
    IPasswordResetTokenRepository: IPasswordResetTokenRepository;
    IAccountRepository: IAccountRepository;
    IBusinessRepository: IBusinessRepository;
    IBusinessAddressRepository: IBusinessAddressRepository;
    IClientRepository: IClientRepository;
    IClientAddressRepository: IClientAddressRepository;
    IInvoiceRepository: IInvoiceRepository;
    IInvoiceItemsRepository: IInvoiceItemsRepository;
    IActivityRepository: IActivityRepository;

    //Handlers
    IUserSignedUpHandler: IUserSignedUpHandler;

    //event bus
    IEventBus: IEventBus;

    //factories
    IVerificationTokenFactory: IVerificationTokenFactory;
    IUserFactory: IUserFactory;
}
