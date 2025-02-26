import { getInjection } from "@/di/container";
import { signUpDto } from "@/src/iam/application/dto/user.dto";
import { EmailAlreadyExistsException } from "@/src/iam/application/exceptions/specific.exceptions";
import { User } from "@/src/iam/domain/user.entity";

export const signUpUseCase = {
    async execute({ email, name, password }: signUpDto) {
        const userRepository = getInjection("IUserRepository");
        const hashingService = getInjection("IHashingService");

        // Check if user already exists
        if (await userRepository.getByEmail(email)) {
            throw new EmailAlreadyExistsException();
        }

        // Hash password
        const hashedPassword = await hashingService.hash(password);

        // Create user instance
        const user = new User(name, email, hashedPassword);

        // Save user in the database
        return await userRepository.insert(user);

        // Return a plain object to avoid serialization issues
    },
};
