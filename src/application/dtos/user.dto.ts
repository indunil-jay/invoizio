import { z } from "zod";

export const createUserDTOschema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1).min(8),
  name: z.string().min(1),
});

export type CreateUserDTO = z.infer<typeof createUserDTOschema>;

export const signInUserDTOschema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1).min(8),
});

export type SignInUserDTO = z.infer<typeof signInUserDTOschema>;
