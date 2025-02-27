import { injectable } from "inversify";
import { nanoid } from "nanoid";
import { ITokenGenerateService } from "@/src/iam/application/services/token-generate.service";

@injectable()
export class TokenGenerateService implements ITokenGenerateService {
    public generate(size?: number): string {
        return nanoid(size);
    }
}
