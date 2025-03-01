import { User } from "@/src/iam/domain/user.entity";

export class ResendVerifyEmailEvent {
    constructor(public readonly user: User) {}
}
