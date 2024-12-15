import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import { SignInUserDTO } from "@/src/application/dtos/user.dto";

export interface IAuthenticationService {
  signInWithCredentials(data: SignInUserDTO): Promise<void>;
  signInWithGoogle(): Promise<ClientResponseDTO>;
  signOut(): Promise<void>;
}
