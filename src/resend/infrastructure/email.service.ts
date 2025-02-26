import envValidationSchema from "@/lib/env-validation-schema";
import { injectable } from "inversify";
import { Resend } from "resend";
import { IEmailService } from "@/src/resend/application/email.service.interface";

@injectable()
export class EmailService implements IEmailService {
    private static readonly resend = new Resend(
        envValidationSchema.RESEND_API_KEY
    );
    public async verifyAccount(email: string, token: string): Promise<void> {
        const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
        EmailService.resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Email Verification",
            html: `<p>Click <a href="${confirmLink}">here to confirm</a>your email.</p>`,
        });
        console.log("✅ Email sent successfully from resend");
    }
}
