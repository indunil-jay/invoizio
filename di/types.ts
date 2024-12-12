import { IUserRepository } from "@/src/application/repositories/user-repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication-service.interface";
import { IHashingService } from "@/src/application/services/hashing-service.interface";

export const DI_SYMBOLS = {
  // Services
  IHashingService: Symbol.for("IHashingService"),
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  IHashingService: IHashingService;
  IAuthenticationService: IAuthenticationService;
  // Repositories
  IUserRepository: IUserRepository;
}
