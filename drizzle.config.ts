import { defineConfig } from "drizzle-kit";
import envValidationSchema from "@/lib/env-validation-schema";

export default defineConfig({
    schema: "./drizzle/schemas/index.ts",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: envValidationSchema.DATABASE_URL,
    },
    //   verbose:true,
    strict: true,
});
