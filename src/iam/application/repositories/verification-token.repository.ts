// import { Transaction } from "@/drizzle";
import { Transaction } from "@/drizzle";
import { CreateToken } from "@/drizzle/schemas/verification-token";
import { VerificationToken } from "@/src/iam/domain/verification-token.entity";

export interface IVerificationTokenRepository {
    insert(data: CreateToken): Promise<VerificationToken>;
    getByToken(token: string): Promise<VerificationToken | undefined>;
    getByEmail(email: string): Promise<VerificationToken | undefined>;
    remove(id: string, tx?: Transaction): Promise<void>;
}
