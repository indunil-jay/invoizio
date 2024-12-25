import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import { SignInUserDTO } from "@/src/application/dtos/user.dto";
import { Session } from "next-auth";

export interface IAuthenticationService {
  signInWithCredentials(data: SignInUserDTO): Promise<void>;
  signInWithGoogle(): Promise<ClientResponseDTO>;
  signOut(): Promise<void>;
  getSession(): Promise<Session | null>;
}
