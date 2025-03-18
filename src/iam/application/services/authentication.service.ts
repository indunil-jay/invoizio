import { Session } from "next-auth";
import { User } from "@/src/iam/domain/user.entity";
import { signInDto } from "../dto/sign-in.dto";

export interface IAuthenticationService {
    signInWithCredentials(data: signInDto): Promise<void>;
    getSession(): Promise<Session | null>;
    verifySessionUser(): Promise<User>;
}
