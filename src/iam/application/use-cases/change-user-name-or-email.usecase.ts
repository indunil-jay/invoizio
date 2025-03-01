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

export const changeUserNameOrEmailUseCase = {
    async execute({ email, name }: changeNameOrEmailDto) {
        const authenticationService = getInjection("IAuthenticationService");
        //check if valid session
        const user = await authenticationService.verifySessionUser();

        //when email request to change

        if (email) {
            return await this.updateEmail(email, user);
        }

        //when username request to change
        if (name) {
            return await this.updateUserName(name, user);
        }

        return NoValidFieldsResponse();
    },

    async updateUserName(name: string, user: User) {
        const userRepository = getInjection("IUserRepository");
        const updatedUser = await userRepository.update(user.id, { name });

        return UserNameUpdateResponse(updatedUser);
    },

    async updateEmail(email: string, user: User) {
        const userRepository = getInjection("IUserRepository");
        const accountRepository = getInjection("IAccountRepository");

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
        console.log("verification email sent");

        return EmailUpdateResponse(updatedUser);
    },
};
