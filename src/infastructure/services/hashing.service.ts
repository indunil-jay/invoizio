import { IHashingService } from "@/src/application/services/hashing-service.interface";
import brcyptjs from "bcryptjs";
import { injectable } from "inversify";

@injectable()
export class HashingService implements IHashingService {
  public async compare(
    inputPassword: string,
    dbPassword: string
  ): Promise<boolean> {
    return await brcyptjs.compare(inputPassword, dbPassword);
  }
  public async hash(password: string): Promise<string> {
    return await brcyptjs.hash(password, 12);
  }
}
