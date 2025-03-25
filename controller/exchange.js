import express from "express";
import {
  setExchange,
  updateExchange,
  getExchange,
  getCurrent,
} from "../handler/exchange.js";

const router = express.Router();

router.route("/").get(getCurrent).post(setExchange);
router.route("/:id").get(getExchange).patch(updateExchange);

export default router;
