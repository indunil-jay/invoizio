import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import { SignInUserRequestDTO } from "@/src/application/dtos/user.dto";
import { Session } from "next-auth";

export interface IAuthenticationService {
  signInWithCredentials(data: SignInUserRequestDTO): Promise<void>;
  signInWithGoogle(): Promise<ClientResponseDTO>;
  signOut(): Promise<void>;
  getSession(): Promise<Session | null>;
}
