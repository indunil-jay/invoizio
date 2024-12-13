import { injectable } from "inversify";
import { Resend } from "resend";
import { IEmailService } from "@/src/application/services/email-service.interface";
import envValidationSchema from "@/lib/env-validation-schema";

@injectable()
export class EmailService implements IEmailService {
  private static readonly resend = new Resend(
    envValidationSchema.RESEND_API_KEY
  );

  public async sendVerificationEmail(
    email: string,
    token: string
  ): Promise<void> {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    EmailService.resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      html: `<p>Click <a href="${confirmLink}">here to confirm</a>your email.</p>`,
    });
  }
}
