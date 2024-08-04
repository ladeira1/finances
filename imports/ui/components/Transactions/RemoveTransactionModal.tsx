import React from "react";
import { Modal } from "../global/Modal";
import { Button } from "../global/Button";
import { REMOVE_TRANSACTION_METHOD } from "../../../api/methods/transactions/removeTransaction";

type RemoveTransactionModalProps = {
  transactionId: string;
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
};

export const RemoveTransactionModal = ({
  transactionId,
  isModalOpen,
  setIsModalOpen,
}: RemoveTransactionModalProps) => {
  const onRemoveTransaction = async () => {
    await Meteor.callAsync(REMOVE_TRANSACTION_METHOD, { _id: transactionId });
  };

  return (
    <Modal isOpen={isModalOpen}>
      <div className="min-w-[18.75rem]">
        <h2 className="text-2xl mb-4">Are you sure you want to remove this transaction?</h2>
        <div className="flex items-end justify-end ml-auto gap-2">
          <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onRemoveTransaction}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
};
