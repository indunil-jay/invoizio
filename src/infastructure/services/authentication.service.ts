import { SignInInput } from "@/drizzle/schemas/user";
import { IAuthenticationService } from "@/src/application/services/authentication-service.interface";
import { signIn } from "@/src/auth";
import { injectable } from "inversify";
import { AuthError } from "next-auth";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  public async signIn(data: SignInInput): Promise<void> {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        // redirectTo: DEFAULT_LOGIN_REDIRECT,
        redirect: false,
      });
    } catch (error) {
      console.error("Error sign in user:", error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            throw new Error("Invalid credentials!");
          default:
            throw new Error("Something went wrong!");
        }
      }
      throw error;
    }
  }
}
