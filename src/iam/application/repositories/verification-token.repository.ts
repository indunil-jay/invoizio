// import { Transaction } from "@/drizzle";
import { Transaction } from "@/drizzle";
import { CreateVerificationToken } from "@/drizzle/schemas/verification-token";
import { VerificationToken } from "@/src/iam/domain/verification-token.entity";

export interface IVerificationTokenRepository {
    insert(
        data: CreateVerificationToken,
        tx?: Transaction
    ): Promise<VerificationToken>;
    getByToken(token: string): Promise<VerificationToken | undefined>;
    getByEmail(email: string): Promise<VerificationToken | undefined>;
    remove(id: string, tx?: Transaction): Promise<void>;
}
