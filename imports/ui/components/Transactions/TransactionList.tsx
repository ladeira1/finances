import { useFind, useSubscribe } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { Collections } from "../../../api/collections";
import { Transaction } from "./Transaction";
import { LIST_TRANSACTIONS_PUBLICATION } from "../../../api/publications/transactions/listTransactions";
import { Button } from "../global/Button";
import { AddTransactionModal } from "./AddTransactionModal";

export const TransactionList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoading = useSubscribe(LIST_TRANSACTIONS_PUBLICATION);
  const data = useFind(() => {
    return Collections.Transactions.find();
  });

  if (isLoading()) {
    return "loading...";
  }

  return (
    <>
      <section className="flex flex-col gap-4 p-4 w-full max-w-[40rem]">
        <div className="flex items-end justify-end ml-auto gap-2">
          <Button onClick={() => setIsModalOpen(true)}>Add transaction</Button>
        </div>

        <h1 className="text-2xl">My transactions</h1>

        <ul className="w-full flex flex-col gap-2 border-solid border-2 border-black rounded p-4">
          {data?.map((transaction) => (
            <li className="w-full" key={transaction._id}>
              <Transaction>{`${transaction.title} - ${transaction.value} - ${transaction.type}`}</Transaction>
            </li>
          ))}
        </ul>
      </section>

      <AddTransactionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};
