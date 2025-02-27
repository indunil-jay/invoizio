import {
    CreateToken,
    VerificationTokenEntity,
} from "@/drizzle/schemas/verification-token";
import { VerificationToken } from "@/src/iam/domain/verification-token.entity";

export class VeirificationTokenMapper {
    static toDomain(
        verificationTokenEntity: VerificationTokenEntity
    ): VerificationToken {
        return new VerificationToken(
            verificationTokenEntity.id,
            verificationTokenEntity.email,
            verificationTokenEntity.token,
            verificationTokenEntity.expires
        );
    }

    static toPersistence(verificationToken: VerificationToken): CreateToken {
        return {
            id: verificationToken.id,
            email: verificationToken.email,
            token: verificationToken.token,
            expires: verificationToken.expires,
        };
    }
}
