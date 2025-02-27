export interface IEmailService {
    verifyAccount(email: string, token: string): Promise<void>;
}
