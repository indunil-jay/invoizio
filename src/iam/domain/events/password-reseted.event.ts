import { User } from "@/src/iam/domain/user.entity";

export class PasswordResetedEvent {
    constructor(public readonly user: User) {}
}
