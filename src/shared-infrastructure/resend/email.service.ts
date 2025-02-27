import { injectable } from "inversify";
import { Resend } from "resend";
import envValidationSchema from "@/lib/env-validation-schema";
import { IEmailService } from "@/src/shared-infrastructure/resend/email.service.interface";
import { BadRequestException } from "@/src/iam/presenter/exceptions/common.exceptions";

const COMPANY_NAME = "invoizio";
const HOST = `http://localhost:3000`;

@injectable()
export class EmailService implements IEmailService {
    private static readonly resend = new Resend(
        envValidationSchema.RESEND_API_KEY
    );
    public async verifyAccount(email: string, token: string): Promise<void> {
        const confirmLink = `${HOST}/auth/new-verification?token=${token}`;

        try {
            const { error } = await EmailService.resend.emails.send({
                from: `${COMPANY_NAME} <onboarding@resend.dev>`,
                to: email,
                subject: "Verify Your Account",
                html: `<p>Click <a href="${confirmLink}">here to confirm</a>your email.</p>`,
            });

            if (error) {
                throw error;
            }
        } catch {
            throw new BadRequestException();
        }
    }
}
