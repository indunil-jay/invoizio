import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import { SignInUserRequestDTO } from "@/src/application/dtos/user.dto";

export interface IAuthenticationService {
  signInWithCredentials(data: SignInUserRequestDTO): Promise<void>;
  signInWithGoogle(): Promise<ClientResponseDTO>;
  signOut(): Promise<void>;
}
