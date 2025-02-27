import { injectable } from "inversify";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { IAuthenticationService } from "@/src/iam/application/services/authentication.service";
import { signInDto } from "@/src/iam/application/dto/user.dto";

@injectable()
export class AuthenticationService implements IAuthenticationService {
    public async signInWithCredentials(data: signInDto): Promise<void> {
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
