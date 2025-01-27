import { pagination } from "../helper/pagination.js";
import {
  transactionModel,
  sellTransactionModel,
  buyTransactionModel,
} from "../model/transaction.js";
import invoiceModel from "../model/invoice.js";

export async function addTransaction(req, res) {
  try {
    const { transactionType, ...body } = req.body;
    let transaction;
    if (transactionType.toLowerCase() === "sell") {
      const buyTransaction = await buyTransactionModel.findById(
        body.buyTransaction
      );
      if (
        Number(buyTransaction.quantity) <
        Number(body.quantity) + Number(buyTransaction.soldQuantity)
      ) {
        throw new Error(
          "the quantity you want to sell is more than the quantity you bought"
        );
      } else {
        buyTransaction.soldQuantity += Number(body.quantity);
        await buyTransaction.save();
      }
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
      if (skip >= numberOfTransactions && numberOfTransactions !== 0)
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
    const transaction = await transactionModel.findById(req.params.id);
    if (transaction.transactionType.toLowerCase() === "buy") {
      await sellTransactionModel.deleteMany({
        buyTransaction: transaction._id,
      });
    } else {
      const buyTransaction = await buyTransactionModel.findById(
        transaction.buyTransaction
      );
      buyTransaction.soldQuantity -= transaction.quantity;
      await buyTransaction.save();
    }
    const deletedTransaction = await transactionModel.findByIdAndDelete(
      req.params.id
    );
    await invoiceModel.updateMany(
      { transactions: deletedTransaction._id },
      { $pull: { transactions: deletedTransaction._id } }
    );
    await invoiceModel.deleteMany({
      transactions: { $size: 0 },
    });

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
    const { expenses, transactionType } = req.body;
    if (transactionType.toLowerCase() === "buy") {
      await buyTransactionModel.findByIdAndUpdate(
        req.params.id,
        {
          expenses,
        },
        { runValidators: true }
      );
    }
    if (transactionType.toLowerCase() === "sell") {
      const buyTransaction = await buyTransactionModel.findById(
        req.body.buyTransaction
      );
      const newSoldQuantity =
        Number(buyTransaction.soldQuantity) -
        Number(req.body.oldQuantity) +
        Number(req.body.quantity);
      if (Number(buyTransaction.quatity) < newSoldQuantity) {
        throw new Error(
          "the quantity you want to sell is more than the quantity you bought"
        );
      } else {
        buyTransaction.soldQuantity = newSoldQuantity;
        await buyTransaction.save();
      }
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
