import { Collections } from "../../collections/index";

export const LIST_TRANSACTIONS_PUBLICATION = "transactions.list";

type ListTransactionsParams = {
  currentPage: number;
  pageSize: number;
};

export function listTransactions({ currentPage, pageSize }: ListTransactionsParams) {
  check(currentPage, Match.Maybe(Number));
  check(pageSize, Match.Maybe(Number));

  const filter: Record<string, any> = {
    sort: { timestamp: -1 },
    skip: Math.max(currentPage * pageSize - pageSize, 0),
    limit: pageSize,
  };

  return Collections.Transactions.find({}, filter);
}
