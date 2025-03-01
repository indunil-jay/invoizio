import { signInDto } from "@/src/iam/application/dto/user.dto";
import { Session } from "next-auth";
import { User } from "@/src/iam/domain/user.entity";

export interface IAuthenticationService {
    signInWithCredentials(data: signInDto): Promise<void>;
    getSession(): Promise<Session | null>;
    verifySessionUser(): Promise<User>;
}
