import SellTransactionModel from "../model/selltransaction.js";
import ComposedProductsModel from "../model/composedProducts.js";
import exchangeModel from "../model/exchange.js";

export async function addSellTransaction(req, res) {
  try {
    const { products: composedProducts, ...others } = req.body;
    const products = await ComposedProductsModel.create(composedProducts);
    let productIds = [];
    for (let i = 0; i < products.length; i++) {
      productIds[i] = products[i]._id;
    }
    const sellTransaction = await SellTransactionModel.create({
      products: productIds,
      ...others,
    });
    await sellTransaction.populate("company");
    await sellTransaction.populate({
      path: "products",
      populate: {
        path: "exchange",
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        sellTransaction,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getSellTransactions(req, res) {
  try {
    const sellTransactions = await SellTransactionModel.find({
      company: req.query.companyId,
    })
      .populate({
        path: "products",
        populate: {
          path: "exchange",
        },
      })
      .populate("company");

    res.status(200).json({
      status: "success",
      data: {
        sellTransactions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
export async function getSellTransaction(req, res) {
  try {
    const sellTransaction = await SellTransactionModel.findById(req.params.id)
      .populate({
        path: "products",
        populate: {
          path: "exchange",
        },
      })
      .populate("company");

    res.status(200).json({
      status: "success",
      data: {
        sellTransaction,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function deleteSellTransaction(req, res) {
  try {
    await SellTransactionModel.findOneAndDelete({
      _id: req.params.id,
    });

    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function updateSellTransaction(req, res) {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("company")
      .populate({
        path: "products",
        populate: {
          path: "exchange",
        },
      });
    res.status(200).json({
      message: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
