import { Collections } from "../../collections";
import { Transaction } from "../../collections/transactions";

export const EDIT_TRANSACTION_METHOD = "transactions.edit";

export const editTransaction = async ({
  _id,
  title,
  type,
  value,
}: Omit<Transaction, "createdAt" | "updatedAt">) => {
  const transaction = await Collections.Transactions.findOneAsync({ _id });

  if (!transaction) {
    throw new Meteor.Error("Transaction not found");
  }

  const id = await Collections.Transactions.updateAsync({ _id }, { $set: { title, type, value } });

  return id;
};
