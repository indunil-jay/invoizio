import { User } from "@/src/iam/domain/user.entity";

export class EmailUpdatedEvent {
    constructor(public readonly user: User) {}
}
