import {
  PasswordResetToken,
  PasswordResetTokenCollectionDocument,
} from "@/drizzle/schemas/password-reset-token";

export interface IPasswordResetTokenRepository {
  create(
    data: PasswordResetToken
  ): Promise<PasswordResetTokenCollectionDocument>;
  getByToken(
    token: string
  ): Promise<PasswordResetTokenCollectionDocument | undefined>;
  getByEmail(
    email: string
  ): Promise<PasswordResetTokenCollectionDocument | undefined>;
  deleteById(id: string): Promise<void>;
}
