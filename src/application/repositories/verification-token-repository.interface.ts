import {
  CreateToken,
  VerificationTokenCollectionDocument,
} from "@/drizzle/schemas/verification-token";

export interface IVerificationTokenRepository {
  create(data: CreateToken): Promise<VerificationTokenCollectionDocument>;
  getByToken(
    token: string
  ): Promise<VerificationTokenCollectionDocument | undefined>;
  getByEmail(
    email: string
  ): Promise<VerificationTokenCollectionDocument | undefined>;
  deleteById(id: string): Promise<void>;
}
