import { IUserRepository } from "@/src/application/repositories/user-repository.interface";
import { IVerificationTokenRepository } from "@/src/application/repositories/verification-token-repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication-service.interface";
import { IHashingService } from "@/src/application/services/hashing-service.interface";
import { ITokenGeneratorService } from "@/src/application/services/token-generator-service.interface";

export const DI_SYMBOLS = {
  // Services
  IHashingService: Symbol.for("IHashingService"),
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  ITokenGeneratorService: Symbol.for("ITokenGeneratorService"),
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  IVerificationTokenRepository: Symbol.for("IVerificationTokenRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  IHashingService: IHashingService;
  IAuthenticationService: IAuthenticationService;
  ITokenGeneratorService: ITokenGeneratorService;
  // Repositories
  IUserRepository: IUserRepository;
  IVerificationTokenRepository: IVerificationTokenRepository;
}
