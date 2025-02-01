import { db, Transaction } from "@/drizzle";
import {
    activities,
    ActivitiesCollectionDocument,
    CreateActivityInput,
    DetailActivitiesCollectionDocument,
} from "@/drizzle/schemas/activity";
import { IActivityRepository } from "@/src/application/repositories/activities-repository.interface";

import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";

@injectable()
export class ActivityRepository implements IActivityRepository {
    public async create(
        data: CreateActivityInput,
        tx?: Transaction
    ): Promise<ActivitiesCollectionDocument> {
        const invoker = tx ?? db;
        try {
            const query = invoker.insert(activities).values(data).returning();

            const [insertedActivity] = await query.execute();
            if (!insertedActivity) {
                throw new Error("Activity creation failed, no data returned.");
            }

            return insertedActivity;
        } catch (error) {
            console.error(
                `DATABASE_ERROR::ActivityRepository::create: ${error}`
            );
            throw new DataBaseError();
        }
    }

    public async getAll(
        businessId: string,
        tx?: Transaction
    ): Promise<DetailActivitiesCollectionDocument[]> {
        const invoker = tx ?? db;
        try {
            const result = await invoker.query.activities.findMany({
                where: eq(activities.businessId, businessId),
                with: {
                    invoice: true,
                    client: true,
                    business: true,
                },
            });

            return result;
        } catch (error) {
            console.error(`DATABASE_ERROR::ActivityRepository::get: ${error}`);
            throw new DataBaseError();
        }
    }
}
