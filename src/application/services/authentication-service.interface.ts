import { SignInInput } from "@/drizzle/schemas/user";

export interface IAuthenticationService {
  signIn(data: SignInInput): Promise<void>;
  signOut(): Promise<void>;
}
