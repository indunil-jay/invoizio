import { getInjection } from "@/di/container";
import { signUpDto } from "@/src/iam/application/dto/user.dto";
import { EmailAlreadyExistsException } from "@/src/iam/application/exceptions/specific.exceptions";
import { User } from "@/src/iam/domain/user.entity";
import { UserSignedUpEvent } from "@/src/iam/domain/events/user-signed-up.event";

export const signUpUseCase = {
    async execute({ email, name, password }: signUpDto) {
        const userRepository = getInjection("IUserRepository");
        const hashingService = getInjection("IHashingService");
        const eventBus = getInjection("IEventBus");

        // Check if user already exists
        if (await userRepository.getByEmail(email)) {
            throw new EmailAlreadyExistsException();
        }

        // Hash password
        const hashedPassword = await hashingService.hash(password);

        // Create user instance
        const user = new User(name, email, hashedPassword);

        // Save user in the database
        const newUser = await userRepository.insert(user);

        // send account verify email

        await eventBus.publish(new UserSignedUpEvent(email, "123456"));

        return newUser;
    },
};
