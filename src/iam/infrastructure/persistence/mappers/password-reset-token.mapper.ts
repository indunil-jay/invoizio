import {
    CreatePasswordResetToken,
    PasswordResetTokenEntity,
} from "@/drizzle/schemas/password-reset-token";
import { PasswordResetToken } from "@/src/iam/domain/password-reset-token.entity";

export class PasswordResetTokenMapper {
    static toDomain(
        passwordResetTokenEntity: PasswordResetTokenEntity
    ): PasswordResetToken {
        return new PasswordResetToken(
            passwordResetTokenEntity.id,
            passwordResetTokenEntity.email,
            passwordResetTokenEntity.token,
            passwordResetTokenEntity.expires
        );
    }

    static toPersistence(
        passwordResetToken: PasswordResetToken
    ): CreatePasswordResetToken {
        return {
            id: passwordResetToken.id,
            email: passwordResetToken.email,
            token: passwordResetToken.token,
            expires: passwordResetToken.expires,
        };
    }
}
