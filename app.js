import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import companyRouter from "./controller/companycontroller.js";
import productRouter from "./controller/productcontroller.js";
import kleshRouter from "./controller/kleshcontroller.js";
import invoiceRouter from "./controller/invoicecontroller.js";
import transactionRouter from "./controller/transactioncontroller.js";
import uploadedInvoicesRouter from "./controller/uploadedInvoicesControler.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.all("*", async (req, res, next) => {
  try {
    if (req.cookies.Auth === process.env.COOKIE) {
      return next();
    }
    const hashPass = await bcrypt.hash(process.env.PASSCODE, 10);
    const isAuth = await bcrypt.compare(req.body.passcode, hashPass);
    if (isAuth) {
      res.cookie("Auth", process.env.COOKIE);
      return next();
    }
    res.status(403).json({
      message: "wrong credential",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});
app.use("/company", companyRouter);
app.use("/product", productRouter);
app.use("/klesh", kleshRouter);
app.use("/invoice", invoiceRouter);
app.use("/transaction", transactionRouter);
app.use("/uploadedInvoices", uploadedInvoicesRouter);

app.use(express.static("public"));

app.all("*", (req, res) => {
  res.status(404).json({
    message: `failed to find the route ${req.originalUrl}`,
  });
});
const databasePort = process.env.DATABASEPORT;
const databaseAddress = process.env.DATABASEADDRESS;
console.log(databaseAddress, databasePort);
await mongoose.connect(
  `mongodb://${process.env.DATABASEADDRESS}:${process.env.DATABASEPORT}/jwani_balak`
);

app.listen(8080, () => {
  console.log("server has started at port 8080");
});
