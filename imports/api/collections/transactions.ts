export type TransactionType = "expense" | "gain";
export type Transaction = {
  _id: string;
  title: string;
  value: number;
  type: TransactionType;
  createdAt?: Date;
  updatedAt?: Date;
};

export const Transactions = new Mongo.Collection<Transaction>("transactions");
