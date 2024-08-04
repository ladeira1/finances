import { Collections } from "../../collections";
import { Transaction } from "../../collections/transactions";

export const REMOVE_TRANSACTION_METHOD = "transactions.remove";

export const removeTransaction = async ({ _id }: Pick<Transaction, "_id">) => {
  await Collections.Transactions.removeAsync({ _id });
};
