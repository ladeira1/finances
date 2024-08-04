import { Meteor } from "meteor/meteor";
import {
  LIST_TRANSACTIONS_PUBLICATION,
  listTransactions,
} from "../imports/api/publications/transactions/listTransactions";
import {
  CREATE_TRANSACTION_METHOD,
  createTransaction,
} from "../imports/api/methods/transactions/createTransaction";
import {
  COUNT_TRANSACTIONS_PUBLICATION,
  countTransactions,
} from "../imports/api/publications/transactions/countTransactions";
import {
  REMOVE_TRANSACTION_METHOD,
  removeTransaction,
} from "../imports/api/methods/transactions/removeTransaction";

Meteor.methods({
  [CREATE_TRANSACTION_METHOD]: createTransaction,
  [REMOVE_TRANSACTION_METHOD]: removeTransaction,
});

Meteor.startup(async () => {
  Meteor.publish(LIST_TRANSACTIONS_PUBLICATION, listTransactions);
  Meteor.publish(COUNT_TRANSACTIONS_PUBLICATION, countTransactions);
});
