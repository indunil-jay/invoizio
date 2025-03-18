import { injectable } from "inversify";
import { db, Transaction } from "@/drizzle";
import { businesses, CreateBusiness } from "@/drizzle/schemas/business";
import { IBusinessRepository } from "@/src/business/application/repositories/business.repository";
import { DataBaseException } from "@/src/shared/infrastructure/exceptions/common.exceptions";
import { Business } from "@/src/business/domain/business.entity";
import { BusinessMapper } from "@/src/business/infrastructure/persistence/mappers/business.mapper";
import { eq } from "drizzle-orm";

@injectable()
export class BusinessRepository implements IBusinessRepository {
    public async get(id: string): Promise<Business | null> {
        try {
            const businessEntity = await db.query.businesses.findFirst({
                where: eq(businesses.id, id),
                with: {
                    image: true,
                    address: true,
                },
            });

            if (!businessEntity) return null;
            console.log({ businessEntity });
            return BusinessMapper.toDomain(businessEntity);
        } catch (error) {
            console.log("GET BUSINESS ERROR (business repository)", error);
            throw new DataBaseException();
        }
    }

    public async insert(
        data: CreateBusiness,
        tx?: Transaction
    ): Promise<Business> {
        const invoker = tx ?? db;
        try {
            const persistenceModal = BusinessMapper.toPersistence(data);
            const mutation = invoker
                .insert(businesses)
                .values(persistenceModal)
                .returning();
            const [insteredBusiness] = await mutation.execute();
            return BusinessMapper.toDomain(insteredBusiness);
        } catch (error) {
            console.log("INSERT BUSINESS ERROR (business repository)", error);
            throw new DataBaseException();
        }
    }
}
