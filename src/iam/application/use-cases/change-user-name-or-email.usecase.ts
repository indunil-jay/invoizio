import { getInjection } from "@/di/container";
import { changeNameOrEmailDto } from "@/src/iam/application/dto/change-user-name-or-email.dto";
import { User } from "@/src/iam/domain/user.entity";
import {
    DuplicateEmailException,
    EmailAlreadyInUseException,
} from "@/src/iam/application/exceptions/specific.exceptions";
import {
    EmailUpdateResponse,
    NoValidFieldsResponse,
    UserNameUpdateResponse,
} from "@/src/iam/application/utils/response-messages/user.specific";
import { EmailUpdatedEvent } from "@/src/iam/domain/events/email-updated.event";
import { IUserRepository } from "@/src/iam/application/repositories/user.repository";
import { IAccountRepository } from "@/src/iam/application/repositories/provider-account.repository";
import { IEventBus } from "@/src/shared/event-store/event-bus.interface";

export const changeUserNameOrEmailUseCase = {
    async execute({ email, name }: changeNameOrEmailDto) {
        const {
            authenticationService,
            userRepository,
            accountRepository,
            eventBus,
        } = this.getServices();
        //check if valid session
        const user = await authenticationService.verifySessionUser();

        //when email request to change
        if (email) {
            return await this.updateEmail(
                email,
                user,
                userRepository,
                accountRepository,
                eventBus
            );
        }

        //when username request to change
        if (name) {
            return await this.updateUserName(name, user, userRepository);
        }

        return NoValidFieldsResponse();
    },

    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            userRepository: getInjection("IUserRepository"),
            accountRepository: getInjection("IAccountRepository"),
            eventBus: getInjection("IEventBus"),
        };
    },

    async updateUserName(
        name: string,
        user: User,
        userRepository: IUserRepository
    ) {
        const updatedUser = await userRepository.update(user.id, { name });

        return UserNameUpdateResponse(updatedUser);
    },

    async updateEmail(
        email: string,
        user: User,
        userRepository: IUserRepository,
        accountRepository: IAccountRepository,
        eventBus: IEventBus
    ) {
        //check send email is different than current email
        if (email === user.email) {
            throw new EmailAlreadyInUseException();
        }

        //check if  request email already exists
        const existingEmail = await userRepository.getByEmail(email);

        if (existingEmail) {
            throw new DuplicateEmailException();
        }

        //check if current email is associated with provider
        const associatedUser = await accountRepository.getById(user.id);

        //if so,  break the relationship
        if (associatedUser) {
            await accountRepository.deleteById(user.id);
        }
        // update existing user, with new email
        const updatedUser = await userRepository.update(user.id, {
            email,
            emailVerified: null,
        });

        //send verification email

        await eventBus.publish(new EmailUpdatedEvent(updatedUser));
        return EmailUpdateResponse(updatedUser);
    },
};
