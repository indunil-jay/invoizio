import { UsersCollectionDocument } from "@/drizzle/schemas/user";

export const presenter = (userDocument: UsersCollectionDocument) => {
  return {
    id: userDocument.id!,
    email: userDocument.email!,
    emailVerified: userDocument.emailVerified,
    name: userDocument.name!,
    image: userDocument.image,
  };
};

export type UserResponse = ReturnType<typeof presenter>;
