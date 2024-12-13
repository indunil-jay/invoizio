import { nanoid } from "nanoid";
import { ITokenGeneratorService } from "@/src/application/services/token-generator-service.interface";
import { injectable } from "inversify";

@injectable()
export class TokenGeneratorService implements ITokenGeneratorService {
  public generate(size?: number): string {
    return nanoid(size);
  }
}
