import { useFind, useSubscribe } from "meteor/react-meteor-data";
import React from "react";
import { Collections } from "../../../api/collections";
import { Transaction } from "./Transaction";
import { LIST_TRANSACTIONS_PUBLICATION } from "../../../api/publications/transactions/listTransactions";

export const TransactionList = () => {
  const isLoading = useSubscribe(LIST_TRANSACTIONS_PUBLICATION);
  const data = useFind(() => {
    return Collections.Transactions.find();
  });

  if (isLoading()) {
    return "loading...";
  }

  return (
    <ul>
      {data?.map((transaction) => (
        <li key={transaction._id}>
          <Transaction>{`${transaction.title} - ${transaction.value} - ${transaction.type}`}</Transaction>
        </li>
      ))}
    </ul>
  );
};
