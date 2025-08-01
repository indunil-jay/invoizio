import { injectable } from "inversify";
import { eq } from "drizzle-orm";

import { db, Transaction } from "@/drizzle";
import { passwordResetTokens } from "@/drizzle/schemas";
import { IPasswordResetTokenRepository } from "@/src/iam/application/repositories/password-reset-token.repository";
import { PasswordResetToken } from "@/src/iam/domain/password-reset-token.entity";
import { PasswordResetTokenMapper } from "@/src/iam/infrastructure/persistence/mappers/password-reset-token.mapper";
import { DataBaseException } from "@/src/shared/infrastructure/exceptions/common.exceptions";

@injectable()
export class PasswordResetTokenRepository
    implements IPasswordResetTokenRepository
{
    public async insert(
        data: PasswordResetToken,
        tx?: Transaction
    ): Promise<PasswordResetToken> {
        const invoker = tx ?? db;
        try {
            const persistenceModel =
                PasswordResetTokenMapper.toPersistence(data);

            const query = invoker
                .insert(passwordResetTokens)
                .values(persistenceModel)
                .returning();

            const [insertedPasswordResetToken] = await query.execute();

            return PasswordResetTokenMapper.toDomain(
                insertedPasswordResetToken
            );
        } catch {
            throw new DataBaseException();
        }
    }

    public async getByToken(
        token: string
    ): Promise<PasswordResetToken | undefined> {
        try {
            const passwordResetToken =
                await db.query.passwordResetTokens.findFirst({
                    where: eq(passwordResetTokens.token, token),
                });
            if (!passwordResetToken) return;
            return PasswordResetTokenMapper.toDomain(passwordResetToken);
        } catch {
            throw new DataBaseException();
        }
    }

    public async getByEmail(
        email: string
    ): Promise<PasswordResetToken | undefined> {
        try {
            const passwordResetToken =
                await db.query.passwordResetTokens.findFirst({
                    where: eq(passwordResetTokens.email, email),
                });
            if (!passwordResetToken) return;
            return PasswordResetTokenMapper.toDomain(passwordResetToken);
        } catch {
            throw new DataBaseException();
        }
    }

    public async remove(id: string, tx?: Transaction): Promise<void> {
        const invoker = tx ?? db;
        try {
            const query = invoker
                .delete(passwordResetTokens)
                .where(eq(passwordResetTokens.id, id));

            await query.execute();
        } catch {
            throw new DataBaseException();
        }
    }
}
