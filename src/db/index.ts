import debug from "debug";
import pg from "pg";
import * as db from "zapatos/db";

export const POOL = new pg.Pool({ connectionString: process.env.DATABASE_URL });
POOL.on("connect", () => console.log("postgres db connected!")).on(
  "error",
  (err: Error) => console.error(err)
);

export const connect = async (): Promise<pg.Pool> => POOL;

const queryDebug = debug("db:query"),
  resultDebug = debug("db:result"),
  txnDebug = debug("db:transaction"),
  strFromTxnId = (txnId: number | undefined) =>
    txnId === undefined ? "-" : String(txnId);

db.setConfig({
  queryListener: (query, txnId) =>
    queryDebug(`(%s) %s\n%o`, strFromTxnId(txnId), query.text, query.values),
  resultListener: (result, txnId, elapsedMs) =>
    resultDebug(
      `(%s, %dms) %O`,
      strFromTxnId(txnId),
      elapsedMs?.toFixed(1),
      result
    ),
  transactionListener: (message, txnId) =>
    txnDebug(`(%s) %s`, strFromTxnId(txnId), message),
});

db.setConfig({
  castArrayParamsToJson: true,
  castObjectParamsToJson: true,
});

export { Users, Comments } from "./entities";
