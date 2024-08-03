import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../global/Modal";
import { Input } from "../global/Input";
import { Button } from "../global/Button";
import { Transaction } from "../../../api/collections/transactions";
import { z } from "zod";
import { METHODS } from "../../../api/methods";

type AddTransactionModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
};

type Inputs = Omit<Transaction, "_id" | "createdAt" | "updatedAt">;

const schema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  type: z.string(),
  value: z.string(),
});

export const AddTransactionModal = ({ isModalOpen, setIsModalOpen }: AddTransactionModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  console.log("err", errors);

  const onSubmit = async (data: Inputs) => {
    console.log("dta", data);
    await Meteor.callAsync(METHODS.CREATE_TRANSACTION_METHOD, data);
  };

  return (
    <Modal isOpen={isModalOpen}>
      <form onSubmit={handleSubmit(onSubmit)} className="min-w-[18.75rem]">
        <h2 className="text-2xl mb-4">Add a transaction</h2>
        <div className="flex flex-col gap-3 mb-8">
          <Input label="Title" {...register("title")} />
          {/* change for a select */}
          <Input label="Type" {...register("type")} />
          <Input label="Value" {...register("value")} type="number" />
        </div>

        <div className="flex items-end justify-end ml-auto gap-2">
          <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Add transaction</Button>
        </div>
      </form>
    </Modal>
  );
};
