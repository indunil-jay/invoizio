import { getInjection } from "@/di/container";
import { changePasswordDto } from "@/src/iam/application/dto/change-password.dto";
import { User } from "@/src/iam/domain/user.entity";
import { IncorrectPasswordException } from "@/src/iam/application/exceptions/specific.exceptions";
import { PasswordChangedEvent } from "@/src/iam/domain/events/password-changed.event";
import { IHashingService } from "@/src/iam/application/services/hashing.service";
import { IUserRepository } from "@/src/iam/application/repositories/user.repository";

export const changePasswordUseCase = {
    async execute({ newPassword, currentPassword }: changePasswordDto) {
        const {
            authenticationService,
            eventBus,
            hashingService,
            userRepository,
        } = this.getServices();
        //check session
        const user = await authenticationService.verifySessionUser();
        //check if password is correct
        await this.verifyPassword(currentPassword, user, hashingService);
        //if,so create new password
        await this.updateNewPassword(
            newPassword,
            user,
            userRepository,
            hashingService
        );

        //public password changed event
        await eventBus.publish(new PasswordChangedEvent(user));
    },

    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            eventBus: getInjection("IEventBus"),
            hashingService: getInjection("IHashingService"),
            userRepository: getInjection("IUserRepository"),
        };
    },

    async verifyPassword(
        currentPassword: string,
        user: User,
        hashingService: IHashingService
    ) {
        const isCorrect = await hashingService.compare(
            currentPassword,
            user.password!
        );
        if (!isCorrect) {
            throw new IncorrectPasswordException();
        }
    },

    async updateNewPassword(
        newPassword: string,
        user: User,
        userRepository: IUserRepository,
        hashingService: IHashingService
    ) {
        const hashedPassword = await hashingService.hash(newPassword);

        await userRepository.update(user.id, {
            password: hashedPassword,
        });
    },
};
