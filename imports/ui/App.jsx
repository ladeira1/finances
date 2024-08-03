import React from "react";
import { TransactionList } from "./components/Transactions/TransactionList";

export const App = () => (
  <div id="app-root" className="font-roboto w-full h-[100vh] flex items-center justify-center">
    <TransactionList />
  </div>
);
