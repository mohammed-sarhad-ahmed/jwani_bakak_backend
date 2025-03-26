import express from "express";
import {
  addSellTransaction,
  updateSellTransaction,
  deleteSellTransaction,
  getSellTransaction,
  getSellTransactions,
  updateComposed,
} from "../handler/handleselltransaction.js";

const router = express.Router();
router.route("/").post(addSellTransaction).get(getSellTransactions);
router
  .route("/:id")
  .get(getSellTransaction)
  .delete(deleteSellTransaction)
  .patch(updateSellTransaction);

router.route("/composed/:id").patch(updateComposed);

export default router;
