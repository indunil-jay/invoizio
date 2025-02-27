import { injectable } from "inversify";
import { VerificationToken } from "../verification-token.entity";

export interface IVerificationTokenFactory {
    create(email: string, token: string, expires: Date): VerificationToken;
}

@injectable()
export class VerificationTokenFactory implements IVerificationTokenFactory {
    public create(
        email: string,
        token: string,
        expires: Date
    ): VerificationToken {
        const id = crypto.randomUUID();

        return new VerificationToken(id, email, token, expires);
    }
}
