import express from "express";
import {
  setExchange,
  updateExchange,
  getExchange,
} from "../handler/exchange.js";

const router = express.Router();

router.route("/").post(setExchange);
router.route("/:id").get(getExchange).patch(updateExchange);

export default router;
