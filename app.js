import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import companyRouter from "./controller/companycontroller.js";
import productRouter from "./controller/productcontroller.js";
import kleshRouter from "./controller/kleshcontroller.js";
import invoiceRouter from "./controller/invoicecontroller.js";
import transactionRouter from "./controller/transactioncontroller.js";
import path from "path";
import { fileURLToPath } from "url";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multerStorage,
});

app.use("/company", upload.single("logo"), companyRouter);
app.use("/product", productRouter);
app.use("/klesh", kleshRouter);
app.use("/invoice", invoiceRouter);
app.use("/transaction", transactionRouter);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.all("*", (req, res) => {
  res.status(404).json({
    message: `failed to find the route ${req.originalUrl}`,
  });
});
const databasePort = process.env.DATABASEPORT;
const databaseAddress = process.env.DATABASEADDRESS;
console.log(databaseAddress, databasePort);
await mongoose.connect(`mongodb://localhost:27017/jwani_balak`);

app.listen(8080, () => {
  console.log("server has started at port 8080");
});
