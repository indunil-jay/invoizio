import { IUserRepository } from "@/src/application/repositories/user-repository.interface";
import { IHashingService } from "@/src/application/services/hashing-service.interface";

export const DI_SYMBOLS = {
  // Services
  IHashingService: Symbol.for("IHashingService"),
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  // Repositories
  IUserRepository: IUserRepository;
  IHashingService: IHashingService;
}
