import { SignInInput } from "@/drizzle/schemas/user";
import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import { IAuthenticationService } from "@/src/application/services/authentication-service.interface";
import { signIn, signOut } from "@/src/auth";
import { injectable } from "inversify";
import { AuthError } from "next-auth";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  public async signInWithGoogle(): Promise<ClientResponseDTO> {
    try {
      const url = await signIn("google", { redirect: false });
      return {
        success: true,
        message: "Sign in success with Google",
        redirectUrl: url,
      };
    } catch (error) {
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "SignOutError":
            throw new Error("sign out error!");
          default:
            throw new Error("Something went wrong!");
        }
      }
      throw error;
    }
  }
  public async signInWithCredentials(data: SignInInput): Promise<void> {
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
