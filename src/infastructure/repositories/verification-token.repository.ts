import { db } from "@/drizzle";
import {
  CreateToken,
  VerificationTokenCollectionDocument,
  verificationTokens,
} from "@/drizzle/schemas/verification-token";
import { IVerificationTokenRepository } from "@/src/application/repositories/verification-token-repository.interface";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";

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
      console.error(`Database insert failed: ${error}`, { data });
      throw new Error(
        "Unable to insert verificationToken. Please try again later."
      );
    }
  }

  public async deleteById(id: string): Promise<void> {
    await db.delete(verificationTokens).where(eq(verificationTokens.id, id));
  }
  public async getByToken(
    token: string
  ): Promise<VerificationTokenCollectionDocument | undefined> {
    try {
      return await db.query.verificationTokens.findFirst({
        where: eq(verificationTokens.token, token),
      });
    } catch (error) {
      throw new Error(
        `Error fetching the verifcation token by token",${error}`
      );
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
      throw new Error(`Error fetching the verifcation token email, ${error}`);
    }
  }
}
