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
}
