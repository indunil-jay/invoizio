import { IHashingService } from "@/src/application/services/hashing-service.interface";
import brcyptjs from "bcryptjs";
import { injectable } from "inversify";
import { HashingError } from "../errors/errors";

@injectable()
export class HashingService implements IHashingService {
  public async compare(
    inputPassword: string,
    dbPassword: string
  ): Promise<boolean> {
    try {
      return await brcyptjs.compare(inputPassword, dbPassword);
    } catch (error) {
      throw new HashingError("Failed to compare passwords", { cause: error });
    }
  }
  public async hash(password: string): Promise<string> {
    try {
      return await brcyptjs.hash(password, 12);
    } catch (error) {
      throw new HashingError("Failed to hash password", { cause: error });
    }
  }
}
