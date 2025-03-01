import { injectable } from "inversify";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { IAuthenticationService } from "@/src/iam/application/services/authentication.service";
import { signInDto } from "@/src/iam/application/dto/user.dto";

@injectable()
export class AuthenticationService implements IAuthenticationService {
    public async signInWithCredentials({
        email,
        password,
    }: signInDto): Promise<void> {
        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
        } catch (error) {
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
