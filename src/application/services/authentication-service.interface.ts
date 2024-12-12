import { SignInInput } from "@/drizzle/schemas/user";

export interface IAuthenticationService {
  signInWithCredentials(data: SignInInput): Promise<void>;
  signInWithGoogle(): Promise<string>;
  signOut(): Promise<void>;
}
