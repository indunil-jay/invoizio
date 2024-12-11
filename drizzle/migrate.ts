import { migrate } from "drizzle-orm/postgres-js/migrator";
import config from "@/drizzle.config";
import { connection, db } from "@/drizzle";
import envValidationSchema from "@/lib/env-validation-schema";

if (!envValidationSchema.DB_MIGRATING) {
  throw new Error(
    'You must set DB_MIGRATING to "true" when running migrations'
  );
}

async function main() {
  if (config.out) {
    await migrate(db, { migrationsFolder: config.out });
    console.log("Migration Done ✅");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await connection.end();
  });
