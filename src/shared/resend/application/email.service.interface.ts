import { Client } from "@/src/client-user/domain/client.entity";
import { User } from "@/src/iam/domain/user.entity";
import { Invoice } from "@/src/invoice/domain/invoice.entity";

export interface IEmailService {
    verifyAccount(user: User, token: string): Promise<void>;
    sendResetPasswordEmail(user: User, token: string): Promise<void>;
    sendPasswordResetedEmail(user: User): Promise<void>;
    sendVerifyEmail(user: User, token: string): Promise<void>;
    sendPasswordChangedEmail(user: User): Promise<void>;
    sendPaymentReminderEmail(client: Client, invoice: Invoice): Promise<void>;
}
