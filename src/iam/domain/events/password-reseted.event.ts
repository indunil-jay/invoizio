import { User } from "@/src/iam/domain/user.entity";

export class PasswordResetedEvent {
    constructor(public user: User) {}
}
