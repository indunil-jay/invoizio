import { User } from "@/src/iam/domain/user.entity";

export const UserNameUpdateResponse = (updatedUser: User) => {
    return {
        message: "Your username has been updated successfully.",
        data: updatedUser,
        status: true,
    };
};

export const EmailUpdateResponse = (updatedUser: User) => {
    return {
        message:
            "Your email has been updated successfully. You need to verify it before use it.",
        data: updatedUser,
        status: true,
    };
};

export const NoValidFieldsResponse = () => {
    return {
        status: false,
        message: "No valid fields were provided to update.",
        data: undefined,
    };
};
