import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import companyRouter from "./controller/companycontroller.js";
import productRouter from "./controller/productcontroller.js";
import invoiceRouter from "./controller/invoicecontroller.js";
import transactionRouter from "./controller/transactioncontroller.js";
import uploadedInvoicesRouter from "./controller/uploadedInvoicesControler.js";

const app = express();

app.use(
  cors({
    origin: ["https://jwani-app.fairpiranha.box.ca", "http://localhost:3000"],
    credentials: true,
  })
);

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.all("*", async (req, res, next) => {
  try {
    if (req.cookies.Auth === process.env.COOKIE) {
      if (req.path !== "/") {
        return next();
      } else {
        return res.status(200).json({
          message: "success login",
        });
      }
    }
    if (!process.env.PASSCODE) throw new Error("problem with env variable");
    if (!req.body.passcode) throw new Error();
    const hashPass = await bcrypt.hash(process.env.PASSCODE, 10);
    const isAuth = await bcrypt.compare(req.body.passcode, hashPass);
    if (isAuth) {
      const isLocal = req.hostname === "localhost";
      res.cookie("Auth", process.env.COOKIE, {
        secure: !isLocal,
        sameSite: isLocal ? "lax" : "none",
        domain: isLocal ? undefined : ".fairpiranha.box.ca",
        maxAge: 24 * 60 * 60 * 1000,
      });

      if (req.path !== "/") {
        return next();
      } else {
        return res.status(200).json({
          message: "success login",
        });
      }
    }
    throw Error();
  } catch (error) {
    res.status(403).json({
      message: "wrong credential",
    });
  }
});
app.use("/company", companyRouter);
app.use("/product", productRouter);
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
  "mongodb+srv://paiwast:123@cluster0.obnne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(8085, "0.0.0.0", () => {
  console.log("server has started at port 8085");
});
