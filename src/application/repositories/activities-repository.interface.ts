import { Transaction } from "@/drizzle";
import {
    ActivitiesCollectionDocument,
    CreateActivityInput,
    DetailActivitiesCollectionDocument,
} from "@/drizzle/schemas/activity";

export interface IActivityRepository {
    create(
        data: CreateActivityInput,
        tx?: Transaction
    ): Promise<ActivitiesCollectionDocument>;
    getAll(
        businessId: string,
        tx?: Transaction
    ): Promise<DetailActivitiesCollectionDocument[]>;
}
