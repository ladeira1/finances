import React, { useState } from "react";
import { Transaction as TransactionDoc } from "../../../api/collections/transactions";
import { Button } from "../global/Button";
import { RemoveTransactionModal } from "./RemoveTransactionModal";
import { EditTransactionModal } from "./EditTransactionModal";

export type TransactionProps = { transaction: TransactionDoc };

export const Transaction = ({ transaction }: TransactionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onOpenRemoveTransactionModal = () => {
    setIsModalOpen(true);
  };

  const onOpenEditTransactionModal = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="rounded py-2 pl-4 border border-black w-full flex items-center justify-between">
        <p className="font-medium">
          {transaction.title} - {transaction.type} - {transaction.value}
        </p>

        <div className="ml-auto flex gap-1">
          <Button variant="outlined" onClick={onOpenEditTransactionModal}>
            edit
          </Button>
          <Button variant="unstyled" className="w-fit" onClick={onOpenRemoveTransactionModal}>
            X
          </Button>
        </div>
      </div>

      <RemoveTransactionModal
        transactionId={transaction._id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <EditTransactionModal
        transaction={transaction}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
      />
    </>
  );
};
