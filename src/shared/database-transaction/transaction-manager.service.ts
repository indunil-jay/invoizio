import { injectable } from "inversify";
import { db, Transaction } from "@/drizzle";
import { ITransactionManagerService } from "./transaction-manager.service.interface";
import { DataBaseException } from "@/src/shared/infrastructure/exceptions/common.exceptions";

@injectable()
export class TransactionManagerService implements ITransactionManagerService {
    public async startTransaction<T>(
        cb: (tx: Transaction) => Promise<T>,
        parent?: Transaction
    ): Promise<T> {
        try {
            const invoker = parent ?? db;
            return invoker.transaction(cb);
        } catch (error) {
            console.error(
                `TransactionManagerService::startTransaction::${error}`
            );
            throw new DataBaseException();
        }
    }
}
