import { User } from "@/src/iam/domain/user.entity";

export class PasswordChangedEvent {
    constructor(public readonly user: User) {}
}
