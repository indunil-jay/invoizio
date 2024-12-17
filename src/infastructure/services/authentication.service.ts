import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import { SignInUserRequestDTO } from "@/src/application/dtos/user.dto";
import { IAuthenticationService } from "@/src/application/services/authentication-service.interface";
import { auth, signIn, signOut } from "@/src/auth";
import { injectable } from "inversify";
import { AuthError, Session } from "next-auth";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  public async getSession(): Promise<Session | null> {
    try {
      return await auth();
    } catch (error) {
      console.log("ERROR SESSION", error);
      throw error;
    }
  }

  public async signInWithGoogle(): Promise<ClientResponseDTO> {
    try {
      const url = await signIn("google", { redirect: false });
      return {
        success: true,
        message: "Sign in success with Google",
        redirectUrl: url,
      };
    } catch (error) {
      console.error("Error getting session:", error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "SessionTokenError":
            throw new Error("Something went wrong!");
          default:
            throw new Error("Something went wrong!");
        }
      }
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
  public async signInWithCredentials(
    data: SignInUserRequestDTO
  ): Promise<void> {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
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
