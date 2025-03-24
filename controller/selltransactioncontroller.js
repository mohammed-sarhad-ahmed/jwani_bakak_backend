import express from "express";
import {
  addSellTransaction,
  updateSellTransaction,
  deleteSellTransaction,
  getSellTransaction,
  getSellTransactions,
} from "../handler/handleselltransaction.js";

const router = express.Router();
router.route("/").post(addSellTransaction).get(getSellTransactions);
router
  .route("/:id")
  .get(getSellTransaction)
  .delete(deleteSellTransaction)
  .patch(updateSellTransaction);
export default router;
