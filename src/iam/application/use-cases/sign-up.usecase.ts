import { getInjection } from "@/di/container";
import { signUpDto } from "@/src/iam/application/dto/user.dto";
import { EmailAlreadyExistsException } from "@/src/iam/application/exceptions/specific.exceptions";
import { UserSignedUpEvent } from "@/src/iam/domain/events/user-signed-up.event";

export const signUpUseCase = {
    async execute({ email, name, password }: signUpDto) {
        const userRepository = getInjection("IUserRepository");
        const hashingService = getInjection("IHashingService");
        const eventBus = getInjection("IEventBus");
        const userFactory = getInjection("IUserFactory");

        // Check if user already exists
        if (await userRepository.getByEmail(email)) {
            throw new EmailAlreadyExistsException();
        }

        // Hash password
        const hashedPassword = await hashingService.hash(password);

        // Create user instance

        const user = userFactory.create(name, email, hashedPassword);

        // Save user in the database
        const newUser = await userRepository.insert(user);

        // send account verify email

        await eventBus.publish(new UserSignedUpEvent(newUser));

        return newUser;
    },
};
