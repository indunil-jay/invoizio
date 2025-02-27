import { User } from "@/src/iam/domain/user.entity";

export class UserSignedUpEvent {
    constructor(public readonly user: User) {}
}
