import { Collections } from "../../collections/index";

export const COUNT_TRANSACTIONS_PUBLICATION = "transactions.count";

export function countTransactions() {
  Counts.publish(this, COUNT_TRANSACTIONS_PUBLICATION, Collections.Transactions.find(), {
    noReady: true,
  });
}
