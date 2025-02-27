import { injectable } from "inversify";
import { User } from "@/src/iam/domain/user.entity";

export interface IUserFactory {
    create(name: string, email: string, password: string): User;
}

@injectable()
export class UserFactory {
    create(name: string, email: string, password: string) {
        const id = crypto.randomUUID();
        return new User(id, name, email, password);
    }
}
