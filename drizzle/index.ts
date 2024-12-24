import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/drizzle/schemas";
import envValidationSchema from "@/lib/env-validation-schema";
import { PgQueryResultHKT, PgTransaction } from "drizzle-orm/pg-core";
import { ExtractTablesWithRelations } from "drizzle-orm";

export const connection = postgres(envValidationSchema.DATABASE_URL, {
  max:
    envValidationSchema.DB_MIGRATING || envValidationSchema.DB_SEEDING
      ? 1
      : undefined,
  onnotice: envValidationSchema.DB_SEEDING ? () => {} : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type DB = typeof db;

export type Transaction = PgTransaction<
  PgQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
