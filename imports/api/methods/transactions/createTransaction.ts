import { Collections } from "../../collections";
import { Transaction } from "../../collections/transactions";

export const CREATE_TRANSACTION_METHOD = "transactions.create";

export const createTransaction = async ({
  title,
  type,
  value,
}: Omit<Transaction, "_id" | "createdAt" | "updatedAt">) => {
  console.log("ddd", title, type, value);
  const id = await Collections.Transactions.insertAsync({ title, type, value });

  return id;
};
