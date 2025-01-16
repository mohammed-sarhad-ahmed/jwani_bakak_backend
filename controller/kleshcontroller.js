import express from "express";
import {
  addKlesh,
  deleteKlesh,
  getKlesh,
  getKleshes,
  updateKlesh,
} from "../handler/kleshHandler";
const router = express.Router();

router.route("/").post(addKlesh).get(getKleshes);
router.route("/:id").get(getKlesh).delete(deleteKlesh).patch(updateKlesh);

export default router;
