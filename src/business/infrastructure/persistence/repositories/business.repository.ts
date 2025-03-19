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
    public async remove(businessId: string): Promise<void> {
        try {
            await db.delete(businesses).where(eq(businesses.id, businessId));
        } catch (error) {
            console.log("DELETE BUSINESS ERROR (business repository)", error);
            throw new DataBaseException();
        }
    }

    public async update(
        id: string,
        property: Partial<CreateBusiness>
    ): Promise<Business> {
        try {
            const [updatedBusinessEntity] = await db
                .update(businesses)
                .set(property)
                .where(eq(businesses.id, id))
                .returning();

            return BusinessMapper.toDomain(updatedBusinessEntity);
        } catch (error) {
            console.log("UPDATE BUSINESS ERROR (business repository)", error);
            throw new DataBaseException();
        }
    }

    public async getAll(userId: string): Promise<Business[] | []> {
        try {
            const businessEntities = await db.query.businesses.findMany({
                where: eq(businesses.userId, userId),
                with: {
                    image: true,
                    address: true,
                },
            });
            return businessEntities.map((businessEntity) =>
                BusinessMapper.toDomain(businessEntity)
            );
        } catch (error) {
            console.log("GET ALL BUSINESS ERROR (business repository)", error);
            throw new DataBaseException();
        }
    }

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
