import { injectable } from "inversify";
import { Resend } from "resend";
import { IEmailService } from "@/src/application/services/email-service.interface";
import envValidationSchema from "@/lib/env-validation-schema";

@injectable()
export class EmailService implements IEmailService {
    private static readonly resend = new Resend(
        envValidationSchema.RESEND_API_KEY
    );

    public async sendInvoiceDetailsToClient(
        email: string,
        invoiceId: string
    ): Promise<void> {
        const downloadLink = `http://localhost:3000/api/invoice/${invoiceId}`;
        EmailService.resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Your Invoice Details",
            html: `<p>This email for your  invoice , <a href=${downloadLink}> Download your Invoice as PDF</a></p>`,
        });
    }

    public async sendPaymentReminderEmail(email: string): Promise<void> {
        EmailService.resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Payment Reminder",
            html: `<p>This email for your  invoice reminder, please settle it before due date</p>`,
        });
    }

    public async sendVerificationEmail(
        email: string,
        token: string
    ): Promise<void> {
        const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
        EmailService.resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Email Verification",
            html: `<p>Click <a href="${confirmLink}">here to confirm</a>your email.</p>`,
        });
    }

    public async sendPasswordResetEmail(
        email: string,
        token: string
    ): Promise<void> {
        const confirmLink = `http://localhost:3000/auth/reset-password?token=${token}`;
        EmailService.resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Reset Password",
            html: `<p>Click <a href="${confirmLink}">here to reset</a>your password.</p>`,
        });
    }
}
