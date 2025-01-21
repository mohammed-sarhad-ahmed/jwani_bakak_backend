import { pagination } from "../helper/pagination.js";
import {
  transactionModel,
  sellTransactionModel,
  buyTransactionModel,
} from "../model/transaction.js";

export async function addTransaction(req, res) {
  try {
    const { transactionType, ...body } = req.body;
    let transaction;
    if (transactionType.toLowerCase() === "sell") {
      transaction = await sellTransactionModel.create(body);
    } else if (transactionType.toLowerCase() === "buy") {
      transaction = await buyTransactionModel.create(body);
    }
    await transaction.populate("company product");
    res.status(200).json({
      message: "success",
      data: {
        transaction,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getTransactions(req, res) {
  try {
    const { page = 1, limit = 10, companyId, productId } = req.query;
    const skip = pagination(page, limit);
    if (req.query.page) {
      const numberOfTransactions = await transactionModel.countDocuments();
      if (skip >= numberOfTransactions)
        throw new Error("the page was not found");
    }
    const transactions = await transactionModel
      .find({
        ...(productId ? { product: productId } : {}),
        ...(companyId ? { company: companyId } : {}),
      })
      .populate("company product")
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: "success",
      results: transactions.length,
      data: {
        transactions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
export async function getTransaction(req, res) {
  try {
    const transaction = await transactionModel
      .findById(req.params.id)
      .populate("company product");
    res.status(200).json({
      message: "success",
      data: {
        transaction,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function deleteTransaction(req, res) {
  try {
    await transactionModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function updateTransaction(req, res) {
  try {
    const { expenses, pricePerUnit, costPerUnit, transactionType } = req.body;
    if (transactionType.toLowerCase() === "buy") {
      await buyTransactionModel.findByIdAndUpdate(
        req.params.id,
        {
          expenses,
          costPerUnit,
        },
        { runValidators: true }
      );
    } else if (transactionType.toLowerCase() === "sell") {
      await sellTransactionModel.findByIdAndUpdate(
        req.params.id,
        {
          pricePerUnit,
        },
        { runValidators: true }
      );
    }
    const transaction = await transactionModel
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      .populate("company product");
    res.status(200).json({
      message: "success",
      data: {
        transaction,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
