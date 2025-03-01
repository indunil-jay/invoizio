import { User } from "@/src/iam/domain/user.entity";

export interface IEmailService {
    verifyAccount(user: User, token: string): Promise<void>;
    sendResetPasswordEmail(user: User, token: string): Promise<void>;
    sendPasswordResetedEmail(user: User): Promise<void>;
}
