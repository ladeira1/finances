import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../global/Modal";
import { Input } from "../global/Input";
import { Button } from "../global/Button";
import { Transaction } from "../../../api/collections/transactions";
import { z } from "zod";
import { METHODS } from "../../../api/methods";
import { Select } from "../global/Select";

type EditTransactionModalProps = {
  transaction: Transaction;
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
};

type Inputs = Omit<Transaction, "_id" | "createdAt" | "updatedAt">;

const schema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  type: z.union([z.literal("gain"), z.literal("expense")]),
  value: z.string(),
});

export const EditTransactionModal = ({
  transaction,
  isModalOpen,
  setIsModalOpen,
}: EditTransactionModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      title: transaction.title,
      type: transaction.type,
      value: transaction.value,
    },
  });

  const onSubmit = async (data: Inputs) => {
    await Meteor.callAsync(METHODS.EDIT_TRANSACTION_METHOD, { _id: transaction._id, ...data });
    reset();
    setIsModalOpen(false);
  };

  const onClose = () => {
    reset();
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen}>
      <form onSubmit={handleSubmit(onSubmit)} className="min-w-[18.75rem]">
        <h2 className="text-2xl mb-4">Edit a transaction</h2>
        <div className="flex flex-col gap-3 mb-8">
          <Input label="Title" {...register("title")} error={errors?.title?.message} />
          <Select
            label="Type"
            {...register("type")}
            error={errors?.type?.message}
            options={[
              { value: "gain", label: "Gain" },
              { value: "expense", label: "Expense" },
            ]}
            defaultValue="gain"
          />
          <Input
            label="Value"
            {...register("value")}
            type="number"
            error={errors?.value?.message}
          />
        </div>

        <div className="flex items-end justify-end ml-auto gap-2">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Edit transaction</Button>
        </div>
      </form>
    </Modal>
  );
};
