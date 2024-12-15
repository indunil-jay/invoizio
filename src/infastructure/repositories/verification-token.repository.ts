import { db } from "@/drizzle";
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
    data: CreateToken
  ): Promise<VerificationTokenCollectionDocument> {
    try {
      const [insertedToken] = await db
        .insert(verificationTokens)
        .values(data)
        .returning();
      if (!insertedToken) {
        throw new Error(
          "Verification token creation failed, no data returned."
        );
      }
      return insertedToken;
    } catch (error) {
      console.error(
        `DATABASE_ERROR::VerificationTokenRepository::create: ${error}`
      );
      throw new DataBaseError();
    }
  }

  public async deleteById(id: string): Promise<void> {
    try {
      await db.delete(verificationTokens).where(eq(verificationTokens.id, id));
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
