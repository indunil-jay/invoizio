import { Transaction } from "@/drizzle";
import {
    CreateToken,
    VerificationTokenCollectionDocument,
} from "@/drizzle/schemas/verification-token";

export interface IVerificationTokenRepository {
    create(
        data: CreateToken,
        tx?: Transaction
    ): Promise<VerificationTokenCollectionDocument>;
    getByToken(
        token: string
    ): Promise<VerificationTokenCollectionDocument | undefined>;
    getByEmail(
        email: string
    ): Promise<VerificationTokenCollectionDocument | undefined>;
    deleteById(id: string, tx?: Transaction): Promise<void>;
}
