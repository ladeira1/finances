import React, { useState } from "react";
import { Transaction as TransactionDoc } from "../../../api/collections/transactions";
import { Button } from "../global/Button";
import { RemoveTransactionModal } from "./RemoveTransactionModal";

export type TransactionProps = { transaction: TransactionDoc };

export const Transaction = ({ transaction }: TransactionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenRemoveTransactionModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="rounded py-2 px-4 border border-black w-full flex items-center justify-between">
        <p className="font-medium">
          {transaction.title} - {transaction.type} - {transaction.value}
        </p>
        <Button variant="unstyled" className="w-fit ml-auto" onClick={onOpenRemoveTransactionModal}>
          X
        </Button>
      </div>

      <RemoveTransactionModal
        transactionId={transaction._id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
