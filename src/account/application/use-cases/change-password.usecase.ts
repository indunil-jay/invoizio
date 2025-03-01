import { getInjection } from "@/di/container";
import { changePasswordDto } from "@/src/account/application/dto/change-password.dto";
import { User } from "@/src/iam/domain/user.entity";
import { IncorrectPasswordException } from "../exceptions/specific.exceptions";

export const changePasswordUseCase = {
    async execute({ newPassword, currentPassword }: changePasswordDto) {
        const authenticationService = getInjection("IAuthenticationService");
        //check session
        const user = await authenticationService.verifySessionUser();
        //check if password is correct
        await this.verifyPassword(currentPassword, user);
        //if,so create new password
        await this.updateNewPassword(newPassword, user);
    },

    async verifyPassword(currentPassword: string, user: User) {
        const hashingService = getInjection("IHashingService");
        const isCorrect = await hashingService.compare(
            currentPassword,
            user.password!
        );
        if (!isCorrect) {
            throw new IncorrectPasswordException();
        }
    },

    async updateNewPassword(newPassword: string, user: User) {
        const hashingService = getInjection("IHashingService");
        const userRepository = getInjection("IUserRepository");
        const hashedPassword = await hashingService.hash(newPassword);

        await userRepository.update(user.id, {
            password: hashedPassword,
        });
    },
};
