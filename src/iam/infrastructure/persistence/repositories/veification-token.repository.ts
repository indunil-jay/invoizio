import { injectable } from "inversify";
import { eq } from "drizzle-orm";
import { db, Transaction } from "@/drizzle";
import { verificationTokens } from "@/drizzle/schemas";
import { IVerificationTokenRepository } from "@/src/iam/application/repositories/verification-token.repository";
import { VerificationToken } from "@/src/iam/domain/verification-token.entity";
import { VeirificationTokenMapper } from "@/src/iam/infrastructure/persistence/mappers/verification-token.mapper";
import { DataBaseException } from "@/src/iam/infrastructure/exceptions/common.exceptions";

// TODO: REMOVE COMMENTS
@injectable()
export class VerificationTokenRepository
    implements IVerificationTokenRepository
{
    public async insert(
        data: VerificationToken,
        tx?: Transaction
    ): Promise<VerificationToken> {
        const invoker = tx ?? db;
        try {
            const persistenceModel =
                VeirificationTokenMapper.toPersistence(data);

            const query = invoker
                .insert(verificationTokens)
                .values(persistenceModel)
                .returning();

            const [insertedVerificationToken] = await query.execute();

            return VeirificationTokenMapper.toDomain(insertedVerificationToken);
        } catch (error) {
            console.error(
                `DATABASE_ERROR::VerificationTokenRepository::create: ${error}`
            );
            throw new DataBaseException();
        }
    }

    public async remove(id: string, tx?: Transaction): Promise<void> {
        const invoker = tx ?? db;
        try {
            const query = invoker
                .delete(verificationTokens)
                .where(eq(verificationTokens.id, id));

            await query.execute();
        } catch (error) {
            console.error(
                `DATABASE_ERROR::VerificationTokenRepository::deleteById: ${error}`
            );
            throw new DataBaseException();
        }
    }
    public async getByToken(
        token: string
    ): Promise<VerificationToken | undefined> {
        try {
            const verificationTokenEntity =
                await db.query.verificationTokens.findFirst({
                    where: eq(verificationTokens.token, token),
                });
            if (!verificationTokenEntity) return undefined;

            return VeirificationTokenMapper.toDomain(verificationTokenEntity);
        } catch (error) {
            console.error(
                `DATABASE_ERROR::VerificationTokenRepository::getByToken: ${error}`
            );
            throw new DataBaseException();
        }
    }
    public async getByEmail(
        email: string
    ): Promise<VerificationToken | undefined> {
        try {
            const verificationTokenEntity =
                await db.query.verificationTokens.findFirst({
                    where: eq(verificationTokens.email, email),
                });
            if (!verificationTokenEntity) return undefined;

            return VeirificationTokenMapper.toDomain(verificationTokenEntity);
        } catch (error) {
            console.error(
                `DATABASE_ERROR::VerificationTokenRepository::getByEmail: ${error}`
            );
            throw new DataBaseException();
        }
    }
}
