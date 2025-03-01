import { injectable } from "inversify";
import { PasswordResetToken } from "@/src/iam/domain/password-reset-token.entity";

export interface IPasswordResetTokenFactory {
    create(email: string, token: string, expires: Date): PasswordResetToken;
}

@injectable()
export class PasswordResetTokenFactory implements IPasswordResetTokenFactory {
    public create(
        email: string,
        token: string,
        expires: Date
    ): PasswordResetToken {
        const id = crypto.randomUUID();

        return new PasswordResetToken(id, email, token, expires);
    }
}
