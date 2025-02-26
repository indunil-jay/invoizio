import { IAccountRepository } from "@/src/application/repositories/account-repository.interface";
import { IActivityRepository } from "@/src/application/repositories/activities-repository.interface";
import { IBusinessAddressRepository } from "@/src/application/repositories/business-address-repository.interface";
import { IBusinessRepository } from "@/src/application/repositories/business-repository.interface";
import { IClientAddressRepository } from "@/src/application/repositories/client-address-repository.interface";
import { IClientRepository } from "@/src/application/repositories/client-repository.interface";
import { IInvoiceItemsRepository } from "@/src/application/repositories/invoice-item-repository.interface";
import { IInvoiceRepository } from "@/src/application/repositories/invoice-repository.interface";
import { IPasswordResetTokenRepository } from "@/src/application/repositories/password-reset-token-repository.interface";

import { IVerificationTokenRepository } from "@/src/application/repositories/verification-token-repository.interface";
import { ITokenGeneratorService } from "@/src/application/services/token-generator-service.interface";
import { ITransactionManagerService } from "@/src/application/services/transaction-service.interface";
import { IUserSignedUpHandler } from "@/src/iam/application/handlers/user-signed-up.handler";

import { IUserRepository } from "@/src/iam/application/repositories/user.repository";
import { IAuthenticationService } from "@/src/iam/application/services/authentication.service";
import { IHashingService } from "@/src/iam/application/services/hashing.service";
import { IEmailService } from "@/src/resend/application/email.service.interface";
import { IEventBus } from "@/src/shared/event-bus.interface";

export const DI_SYMBOLS = {
    // Services
    IHashingService: Symbol.for("IHashingService"),
    IAuthenticationService: Symbol.for("IAuthenticationService"),
    ITokenGeneratorService: Symbol.for("ITokenGeneratorService"),
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
};

export interface DI_RETURN_TYPES {
    // Services
    IHashingService: IHashingService;
    IAuthenticationService: IAuthenticationService;
    ITokenGeneratorService: ITokenGeneratorService;
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
}
