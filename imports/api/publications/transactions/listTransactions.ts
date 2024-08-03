import { Collections } from "../../collections/index";

export const LIST_TRANSACTIONS_PUBLICATION = "transactions.list";

export const listTransactions = () => {
  return Collections.Transactions.find();
};
