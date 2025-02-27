export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password?: string | null,
        public readonly emailVerified?: Date | null,
        public readonly image?: string | null
    ) {}

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            emailVerified: this.emailVerified,
            image: this.image,
        };
    }
}
