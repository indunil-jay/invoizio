import { Table, getTableName, sql } from "drizzle-orm";
import { connection, db, DB } from "@/drizzle";
import envValidationSchema from "@/lib/env-validation-schema";

import * as schema from "@/drizzle/schemas";
import * as seeds from "@/drizzle/seeds";

if (!envValidationSchema.DB_SEEDING) {
    throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: DB, table: Table) {
    return db.execute(
        sql.raw(
            `TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`
        )
    );
}

async function main() {
    for (const table of [schema.statuses]) {
        await resetTable(db, table);
    }

    //seeding data sequentially data
    await seeds.statuses(db);

    //finally close the connection
    await connection.end();
}

main()
    .catch((e) => {
        console.log(e);
        // process.exit(1);
    })
    .finally(async () => {
        console.log("Seeding done! ✅");
        // process.exit(0);
    });
