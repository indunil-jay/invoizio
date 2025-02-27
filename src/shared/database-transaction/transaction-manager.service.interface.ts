import { Transaction } from "@/drizzle";

export interface ITransactionManagerService {
    startTransaction<T>(
        cb: (tx: Transaction) => Promise<T>,
        parent?: Transaction
    ): Promise<T>;
}
