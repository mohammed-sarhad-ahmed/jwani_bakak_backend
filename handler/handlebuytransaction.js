import BuyTransactionModel from "../model/buytransaction.js";
import ComposedProductsModel from "../model/composedproducts.js";

export async function addBuyTransaction(req, res) {
  try {
    const { composedProducts, ...others } = req.body;
    const products = await ComposedProductsModel.create(composedProducts);
    let ProductIds = [];
    for (let i = 0; i < products.length; i++) {
      ProductIds[i] = products._id;
    }
    const buyTransaction = await BuyTransactionModel.create({
      ProductIds,
      ...others,
    })
      .populate("products")
      .populate("company");

    res.status(200).json({
      status: "success",
      data: {
        buyTransaction,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getBuyTransactions(req, res) {
  try {
    const buyTransactions = await BuyTransactionModel.find({
      company: req.query.companyId,
    }).populate("Products");

    res.status(200).json({
      status: "success",
      data: {
        buyTransactions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
export async function getBuyTransaction(req, res) {
  try {
    const buyTransaction = await BuyTransactionModel.findById(req.prams.id)
      .populate("products")
      .populate("company");

    res.status(200).json({
      status: "success",
      data: {
        buyTransaction,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function deleteBuyTransaction(req, res) {
  try {
    const buyTransaction = await BuyTransactionModel.findByIdAndDelete(
      req.prams.id
    );
    await ComposedProductsModel.deleteMany({
      _id: {
        $in: buyTransaction.products,
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function updateBuyTransaction(req, res) {
  try {
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
