import { z, ZodError } from "zod";
import loadEnv from "./load-env";

//fix for edge-runtime issue, prevent loading node-API things
const isEdgeRuntime = process.env.NEXT_RUNTIME === "edge";

if (!isEdgeRuntime) {
  loadEnv();
}

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

const envSchema = z.object({
  AUTH_SECRET: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
  AUTH_GOOGLE_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
});

export type EnvTypes = z.infer<typeof envSchema>;

try {
  if (!isEdgeRuntime) {
    envSchema.parse(process.env);
  }
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => {
      message += issue.path[0] + "\n";
    });
    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    console.error(error);
  }
}

export default envSchema.parse(process.env);
