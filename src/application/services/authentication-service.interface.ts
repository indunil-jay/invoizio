import { SignInInput } from "@/drizzle/schemas/user";
import { ClientResponseDTO } from "@/src/application/dtos/response.dto";

export interface IAuthenticationService {
  signInWithCredentials(data: SignInInput): Promise<void>;
  signInWithGoogle(): Promise<ClientResponseDTO>;
  signOut(): Promise<void>;
}
