import { injectable } from "inversify";
import { auth, signIn } from "@/auth";
import { AuthError, Session } from "next-auth";
import { IAuthenticationService } from "@/src/iam/application/services/authentication.service";

import {
    InvalidSession,
    InvalidSessionException,
    InvalidSessionUserException,
} from "@/src/iam/infrastructure/exceptions/session.exceptions";
import { User } from "@/src/iam/domain/user.entity";
import { getInjection } from "@/di/container";
import { signInDto } from "../../application/dto/sign-in.dto";

@injectable()
export class AuthenticationService implements IAuthenticationService {
    public async verifySessionUser(): Promise<User> {
        const userRepository = getInjection("IUserRepository");
        const session = await this.getSession();
        if (!session || !session.user || !session.user.id) {
            throw new InvalidSessionException();
        }

        const existingUser = await userRepository.getById(session.user.id);
        if (!existingUser) {
            throw new InvalidSessionUserException();
        }
        return existingUser;
    }

    public async getSession(): Promise<Session | null> {
        try {
            return await auth();
        } catch (error) {
            console.log({ sessionError: error });
            throw new InvalidSession();
        }
    }

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
