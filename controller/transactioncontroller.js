import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../handler/handleTransaction.js";

const router = express.Router();
router.route("/").post(addTransaction).get(getTransactions);
router
  .route("/:id")
  .get(getTransaction)
  .delete(deleteTransaction)
  .patch(updateTransaction);
export default router;
