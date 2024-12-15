import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { db } from "@/drizzle";
import {
  PasswordResetToken,
  PasswordResetTokenCollectionDocument,
} from "@/drizzle/schemas/password-reset-token";
import { passwordResetTokens } from "@/drizzle/schemas";
import { IPasswordResetTokenRepository } from "@/src/application/repositories/password-reset-token-repository.interface";
import { DataBaseError } from "@/src/infastructure/errors/errors";

@injectable()
export class PasswordResetTokenRepository
  implements IPasswordResetTokenRepository
{
  public async create(
    data: PasswordResetToken
  ): Promise<PasswordResetTokenCollectionDocument> {
    try {
      const [insertedToken] = await db
        .insert(passwordResetTokens)
        .values(data)
        .returning();
      if (!insertedToken) {
        throw new Error(
          "password reset token creation failed, no data returned."
        );
      }
      return insertedToken;
    } catch (error) {
      console.error(
        `DATABASE_ERROR::PasswordResetTokenRepository::create: ${error}`
      );
      throw new DataBaseError();
    }
  }

  public async deleteById(id: string): Promise<void> {
    try {
      await db
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, id));
    } catch (error) {
      console.error(
        `DATABASE_ERROR::PasswordResetTokenRepository::delete: ${error}`
      );
      throw new DataBaseError();
    }
  }
  public async getByToken(
    token: string
  ): Promise<PasswordResetTokenCollectionDocument | undefined> {
    try {
      return await db.query.passwordResetTokens.findFirst({
        where: eq(passwordResetTokens.token, token),
      });
    } catch (error) {
      console.error(
        `DATABASE_ERROR::PasswordResetTokenRepository::getByToken: ${error}`
      );
      throw new DataBaseError();
    }
  }
  public async getByEmail(
    email: string
  ): Promise<PasswordResetTokenCollectionDocument | undefined> {
    try {
      return await db.query.passwordResetTokens.findFirst({
        where: eq(passwordResetTokens.email, email),
      });
    } catch (error) {
      console.error(
        `DATABASE_ERROR::PasswordResetTokenRepository::getByEmail: ${error}`
      );
      throw new DataBaseError();
    }
  }
}
