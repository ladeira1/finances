import React from "react";

export type TransactionProps = { children: string };

export const Transaction = ({ children }: TransactionProps) => {
  return (
    <div className="rounded py-2 px-4 border border-black w-full">
      <p className="font-medium">{children}</p>
    </div>
  );
};
