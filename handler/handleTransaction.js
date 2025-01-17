import {
  transactionModel,
  sellTransactionModel,
  buyTransactionModel,
} from "../model/transaction.js";

export async function addTransaction(req, res) {
  try {
    let transaction;
    if (req.body.transactionType.toLowerCase() === "sell") {
      transaction = await sellTransactionModel.create(req.body);
    } else if (eq.body.transactionType.toLowerCase() === "buy") {
      transaction = await buyTransactionModel.create(req.body);
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
    const transactions = await transactionModel
      .find()
      .populate("company product");
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
