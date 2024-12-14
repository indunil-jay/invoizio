import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { db } from "@/drizzle";
import {
  PasswordResetToken,
  PasswordResetTokenCollectionDocument,
} from "@/drizzle/schemas/password-reset-token";
import { passwordResetTokens } from "@/drizzle/schemas";
import { IPasswordResetTokenRepository } from "@/src/application/repositories/password-reset-token-repository.interface";

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
      console.error(`Database insert failed: ${error}`, { data });
      throw new Error(
        "Unable to insert password reset token. Please try again later."
      );
    }
  }

  public async deleteById(id: string): Promise<void> {
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, id));
  }
  public async getByToken(
    token: string
  ): Promise<PasswordResetTokenCollectionDocument | undefined> {
    try {
      return await db.query.passwordResetTokens.findFirst({
        where: eq(passwordResetTokens.token, token),
      });
    } catch (error) {
      throw new Error(
        `Error fetching the password reset token by token",${error}`
      );
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
      throw new Error(
        `Error fetching the password reset token email, ${error}`
      );
    }
  }
}
