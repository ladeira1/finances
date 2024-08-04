import { Collections } from "../../collections/index";

export const COUNT_TRANSACTIONS_PUBLICATION = "COUNT_TRANSACTIONS_PUBLICATION";

export function countTransactions() {
  Counts.publish(this, COUNT_TRANSACTIONS_PUBLICATION, Collections.Transactions.find(), {
    noReady: true,
  });
}
