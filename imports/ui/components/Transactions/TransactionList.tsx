import { useFind, useSubscribe, useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { Collections } from "../../../api/collections";
import { Transaction } from "./Transaction";
import { LIST_TRANSACTIONS_PUBLICATION } from "../../../api/publications/transactions/listTransactions";
import { Button } from "../global/Button";
import { AddTransactionModal } from "./AddTransactionModal";
import { Pagination } from "../global/Pagination";
import { PaginationActionsTypes, usePagination } from "../../../hooks/usePagination";
import { Counts } from "meteor/tmeasday:publish-counts";
import { COUNT_TRANSACTIONS_PUBLICATION } from "../../../api/publications/transactions/countTransactions";

export const TransactionList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useSubscribe(COUNT_TRANSACTIONS_PUBLICATION);
  const totalItems = useTracker(() => {
    return Counts.get(COUNT_TRANSACTIONS_PUBLICATION);
  });

  const { pagination, changePagination } = usePagination({ totalItems });

  const isLoading = useSubscribe(LIST_TRANSACTIONS_PUBLICATION, {
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });

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

        <div className="flex flex-col gap-4">
          <ul className="w-full flex flex-col gap-2 border-solid border-2 border-black rounded p-4">
            {data?.map((transaction) => (
              <li className="w-full" key={transaction._id}>
                <Transaction transaction={transaction}></Transaction>
              </li>
            ))}
          </ul>

          <Pagination
            {...pagination}
            selectPage={(page) =>
              changePagination({ type: PaginationActionsTypes.CHANGE_CURRENT_PAGE, payload: page })
            }
          />
        </div>
      </section>

      <AddTransactionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};
