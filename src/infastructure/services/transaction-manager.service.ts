import { db, Transaction } from "@/drizzle";
import { ITransactionManagerService } from "@/src/application/services/transaction-service.interface";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";

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
      console.error(`TransactionManagerService::startTransaction::${error}`);
      throw new DataBaseError();
    }
  }
}
