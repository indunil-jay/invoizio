import brcyptjs from "bcryptjs";
import { injectable } from "inversify";
import { IHashingService } from "@/src/iam/application/services/hashing.service";
import {
    PasswordCompareException,
    PasswordHashException,
} from "@/src/iam/infrastructure/exceptions/hashing.exceptions";

@injectable()
export class HashingService implements IHashingService {
    public async compare(
        inputPassword: string,
        dbPassword: string
    ): Promise<boolean> {
        try {
            return await brcyptjs.compare(inputPassword, dbPassword);
        } catch {
            throw new PasswordCompareException();
        }
    }
    public async hash(password: string): Promise<string> {
        try {
            return await brcyptjs.hash(password, 12);
        } catch {
            throw new PasswordHashException();
        }
    }
}
