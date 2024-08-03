import { useFind, useSubscribe } from "meteor/react-meteor-data";
import React from "react";
import { Collections } from "../../../api/collections";
import { Transaction } from "./Transaction";
import { LIST_TRANSACTIONS_PUBLICATION } from "../../../api/publications/transactions/listTransactions";
import { Button } from "../global/Button";

export const TransactionList = () => {
  const isLoading = useSubscribe(LIST_TRANSACTIONS_PUBLICATION);
  const data = useFind(() => {
    return Collections.Transactions.find();
  });

  if (isLoading()) {
    return "loading...";
  }

  return (
    <section>
      <h1>My transactions</h1>

      <div>
        {data?.length > 0 && <Button variant="outlined">Remove transaction</Button>}
        <Button>Add transaction</Button>
      </div>
      <ul>
        {data?.map((transaction) => (
          <li key={transaction._id}>
            <Transaction>{`${transaction.title} - ${transaction.value} - ${transaction.type}`}</Transaction>
          </li>
        ))}
      </ul>
    </section>
  );
};
