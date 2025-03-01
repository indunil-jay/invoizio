import { Transaction } from "@/drizzle";
import { PasswordResetToken } from "@/src/iam/domain/password-reset-token.entity";

export interface IPasswordResetTokenRepository {
    insert(
        data: PasswordResetToken,
        tx?: Transaction
    ): Promise<PasswordResetToken>;
    getByToken(token: string): Promise<PasswordResetToken | undefined>;
    getByEmail(email: string): Promise<PasswordResetToken | undefined>;
    remove(id: string, tx?: Transaction): Promise<void>;
}
