import { User } from "@/src/iam/domain/user.entity";

export class SendResetPasswordEmailEvent {
    constructor(public user: User) {}
}
