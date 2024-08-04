import { Meteor } from "meteor/meteor";
import { listTransactions } from "../imports/api/publications/transactions/listTransactions";
import { createTransaction } from "../imports/api/methods/transactions/createTransaction";
import { countTransactions } from "../imports/api/publications/transactions/countTransactions";
import { removeTransaction } from "../imports/api/methods/transactions/removeTransaction";
import { METHODS } from "../imports/api/methods";
import { PUBLICATIONS } from "../imports/api/publications";
import { editTransaction } from "../imports/api/methods/transactions/editTransaction";

Meteor.methods({
  [METHODS.CREATE_TRANSACTION_METHOD]: createTransaction,
  [METHODS.REMOVE_TRANSACTION_METHOD]: removeTransaction,
  [METHODS.EDIT_TRANSACTION_METHOD]: editTransaction,
});

Meteor.startup(async () => {
  Meteor.publish(PUBLICATIONS.LIST_TRANSACTIONS_PUBLICATION, listTransactions);
  Meteor.publish(PUBLICATIONS.COUNT_TRANSACTIONS_PUBLICATION, countTransactions);
});
