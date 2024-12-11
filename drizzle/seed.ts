import { Table, getTableName, sql } from "drizzle-orm";
import { connection, db, DB } from "@/drizzle";
import envValidationSchema from "@/lib/env-validation-schema";

// import * as schema from "@/drizzle/schemas";
// import * as seeds from "@/drizzle/seeds";

if (!envValidationSchema.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: DB, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

async function main() {
  for (const table of [
    //import seeding schema here,
  ]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
    console.log("Seeding done! ✅");
  }

  //seeding data sequentially data
  //   await seeds.category(db);

  //finally close the connection
  await connection.end();
}

main()
  .catch((e) => {
    console.log(e);
    // process.exit(1);
  })
  .finally(async () => {
    // process.exit(0);
  });
