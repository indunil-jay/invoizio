import { db, Transaction } from "@/drizzle";
import {
    CreateToken,
    VerificationTokenCollectionDocument,
    verificationTokens,
} from "@/drizzle/schemas/verification-token";
import { IVerificationTokenRepository } from "@/src/application/repositories/verification-token-repository.interface";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { DataBaseError } from "@/src/infastructure/errors/errors";

@injectable()
export class VerificationTokenRepository
    implements IVerificationTokenRepository
{
    public async create(
        data: CreateToken,
        tx?: Transaction
    ): Promise<VerificationTokenCollectionDocument> {
        const invoker = tx ?? db;
        try {
            const query = invoker
                .insert(verificationTokens)
                .values(data)
                .returning();

            const [insertedInvoice] = await query.execute();
            if (!insertedInvoice) {
                throw new Error(
                    "Verification token creation failed, no data returned."
                );
            }

            return insertedInvoice;
        } catch (error) {
            console.error(
                `DATABASE_ERROR::VerificationTokenRepository::create: ${error}`
            );
            throw new DataBaseError();
        }
    }

    public async deleteById(id: string, tx?: Transaction): Promise<void> {
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
            throw new DataBaseError();
        }
    }
    public async getByToken(
        token: string
    ): Promise<VerificationTokenCollectionDocument | undefined> {
        try {
            return await db.query.verificationTokens.findFirst({
                where: eq(verificationTokens.token, token),
            });
        } catch (error) {
            console.error(
                `DATABASE_ERROR::VerificationTokenRepository::getByToken: ${error}`
            );
            throw new DataBaseError();
        }
    }
    public async getByEmail(
        email: string
    ): Promise<VerificationTokenCollectionDocument | undefined> {
        try {
            return await db.query.verificationTokens.findFirst({
                where: eq(verificationTokens.email, email),
            });
        } catch (error) {
            console.error(
                `DATABASE_ERROR::VerificationTokenRepository::getByEmail: ${error}`
            );
            throw new DataBaseError();
        }
    }
}
