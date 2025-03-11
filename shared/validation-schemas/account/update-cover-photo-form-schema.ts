import { z } from "zod";

export const updateCoverPhotoFormSchema = z.object({
    image: z.union([
        z.instanceof(File),
        z
            .string()
            .nullable()
            .transform((val) => val || undefined),
    ]),
});
