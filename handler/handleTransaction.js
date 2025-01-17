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
    const { pagination, companyId, productId } = req.query;
    const transactions = await transactionModel
      .find({
        ...(productId ? { product: productId } : {}),
        ...(companyId ? { company: companyId } : {}),
      })
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
