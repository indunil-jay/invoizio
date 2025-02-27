import { signInDto } from "@/src/iam/application/dto/user.dto";

export interface IAuthenticationService {
    signInWithCredentials(data: signInDto): Promise<void>;
}
