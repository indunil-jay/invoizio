export class User {
    constructor(
        public name: string,
        public email: string,
        public password?: string | null,
        public emailVerified?: Date | null,
        public image?: string | null
    ) {}

    public toJSON() {
        return {
            name: this.name,
            email: this.email,
            emailVerified: this.emailVerified,
            image: this.image,
        };
    }
}
