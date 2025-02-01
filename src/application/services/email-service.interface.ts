export interface IEmailService {
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendPaymentReminderEmail(email: string): Promise<void>;
    sendInvoiceDetailsToClient(email: string, invoiceId: string): Promise<void>;
}
