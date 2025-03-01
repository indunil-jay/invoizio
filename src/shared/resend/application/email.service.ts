import { injectable } from "inversify";
import { Resend } from "resend";

import envValidationSchema from "@/lib/env-validation-schema";
import { IEmailService } from "@/src/shared/resend/application/email.service.interface";
import { EmailSendingException } from "@/src/shared/resend/application/specific.exceptions";
import { User } from "@/src/iam/domain/user.entity";
import InvoizioVerifyAccount from "@/src/shared/resend/presenter/templates/account-verifiy";
import InvoizioResetPassword from "@/src/shared/resend/presenter/templates/reset-password";

const COMPANY_NAME = "invoizio";
const HOST = `http://localhost:3000`;

@injectable()
export class EmailService implements IEmailService {
    private static readonly resend = new Resend(
        envValidationSchema.RESEND_API_KEY
    );
    public async sendResetPasswordEmail(
        user: User,
        token: string
    ): Promise<void> {
        const resetUrl = `${HOST}/auth/reset-password?token=${token}`;

        try {
            const { error } = await EmailService.resend.emails.send({
                from: `${COMPANY_NAME} <onboarding@resend.dev>`,
                to: user.email,
                subject: "Reset Your Password",
                react: InvoizioResetPassword({ userName: user.name, resetUrl }),
            });

            if (error) {
                throw error;
            }
        } catch {
            throw new EmailSendingException();
        }
    }

    public async verifyAccount(user: User, token: string): Promise<void> {
        const verifyUrl = `${HOST}/auth/new-verification?token=${token}`;

        try {
            const { error } = await EmailService.resend.emails.send({
                from: `${COMPANY_NAME} <onboarding@resend.dev>`,
                to: user.email,
                subject: "Verify Your Account",
                react: InvoizioVerifyAccount({
                    userName: user.name,
                    verifyUrl,
                }),
            });

            if (error) {
                throw error;
            }
        } catch {
            throw new EmailSendingException();
        }
    }
}
