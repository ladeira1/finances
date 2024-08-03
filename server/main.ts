import { Meteor } from "meteor/meteor";
import {
  LIST_TRANSACTIONS_PUBLICATION,
  listTransactions,
} from "../imports/api/publications/transactions/listTransactions";
import {
  CREATE_TRANSACTION_METHOD,
  createTransaction,
} from "../imports/api/methods/transactions/createTransaction";

Meteor.methods({
  [CREATE_TRANSACTION_METHOD]: createTransaction,
});

Meteor.startup(async () => {
  Meteor.publish(LIST_TRANSACTIONS_PUBLICATION, listTransactions);
});
