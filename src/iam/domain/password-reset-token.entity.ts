export class PasswordResetToken {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly token: string,
        public readonly expires: Date
    ) {}
}
