import { getCurrentUserUseCase } from "@/src/iam/application/use-cases/get-current-user.usecase";
import { User } from "@/src/iam/domain/user.entity";

const presenter = (user: User) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified?.toISOString(),
        image: user.image || user.profileImage?.url,
        userCoverImages: user.coverImage ? { url: user.coverImage.url } : null,
    };
};

export const getCurrentUserController = async () => {
    const user = await getCurrentUserUseCase.execute();
    return presenter(user);
};
