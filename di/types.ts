import { IAccountRepository } from "@/src/application/repositories/account-repository.interface";
import { IPasswordResetTokenRepository } from "@/src/application/repositories/password-reset-token-repository.interface";
import { IUserRepository } from "@/src/application/repositories/user-repository.interface";
import { IVerificationTokenRepository } from "@/src/application/repositories/verification-token-repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication-service.interface";
import { IEmailService } from "@/src/application/services/email-service.interface";
import { IHashingService } from "@/src/application/services/hashing-service.interface";
import { ITokenGeneratorService } from "@/src/application/services/token-generator-service.interface";

export const DI_SYMBOLS = {
  // Services
  IHashingService: Symbol.for("IHashingService"),
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  ITokenGeneratorService: Symbol.for("ITokenGeneratorService"),
  IEmailService: Symbol.for("IEmailService"),
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  IVerificationTokenRepository: Symbol.for("IVerificationTokenRepository"),
  IPasswordResetTokenRepository: Symbol.for("IPasswordResetTokenRepository"),
  IAccountRepository: Symbol.for("IAccountRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  IHashingService: IHashingService;
  IAuthenticationService: IAuthenticationService;
  ITokenGeneratorService: ITokenGeneratorService;
  IEmailService: IEmailService;
  // Repositories
  IUserRepository: IUserRepository;
  IVerificationTokenRepository: IVerificationTokenRepository;
  IPasswordResetTokenRepository: IPasswordResetTokenRepository;
  IAccountRepository: IAccountRepository;
}
