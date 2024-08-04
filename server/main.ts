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

Meteor.methods({
  [CREATE_TRANSACTION_METHOD]: createTransaction,
});

Meteor.startup(async () => {
  Meteor.publish(LIST_TRANSACTIONS_PUBLICATION, listTransactions);
  Meteor.publish(COUNT_TRANSACTIONS_PUBLICATION, countTransactions);
});
