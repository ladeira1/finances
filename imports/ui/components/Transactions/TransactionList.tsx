import { useFind, useSubscribe, useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { Collections } from "../../../api/collections";
import { Transaction } from "./Transaction";
import { Button } from "../global/Button";
import { AddTransactionModal } from "./AddTransactionModal";
import { Pagination } from "../global/Pagination";
import { PaginationActionsTypes, usePagination } from "../../../hooks/usePagination";
import { Counts } from "meteor/tmeasday:publish-counts";
import { PUBLICATIONS } from "../../../api/publications";

export const TransactionList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useSubscribe(PUBLICATIONS.COUNT_TRANSACTIONS_PUBLICATION);
  const totalItems = useTracker(() => {
    return Counts.get(PUBLICATIONS.COUNT_TRANSACTIONS_PUBLICATION);
  });

  const { pagination, changePagination } = usePagination({ totalItems });

  const isLoading = useSubscribe(PUBLICATIONS.LIST_TRANSACTIONS_PUBLICATION, {
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });

  const data = useTracker(() => {
    const transactions = Collections.Transactions.find().fetch();
    const totalValue = transactions.reduce((acc, curr) => {
      if (curr.type === "gain") return acc + Number(curr.value);
      return acc - Number(curr.value);
    }, 0);

    return { transactions, totalValue };
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
        <p className="text-2xl">Total value: ${data?.totalValue}</p>

        <div className="flex flex-col gap-4">
          <ul className="w-full flex flex-col gap-2 border-solid border-2 border-black rounded p-4">
            {data?.transactions?.map((transaction) => (
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
