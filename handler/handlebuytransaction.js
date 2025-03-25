import BuyTransactionModel from "../model/buytransaction.js";
import ComposedProductsModel from "../model/composedProducts.js";
export async function addBuyTransaction(req, res) {
  try {
    const { products: composedProducts, ...others } = req.body;
    const products = await ComposedProductsModel.insertMany(composedProducts);
    let productIds = [];
    for (let i = 0; i < products.length; i++) {
      productIds[i] = products[i]._id;
    }
    const buyTransaction = await BuyTransactionModel.create({
      products: productIds,
      ...others,
    });
    await buyTransaction.populate("company");
    await buyTransaction.populate({
      path: "products",
      populate: {
        path: "exchange",
      },
    });
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
    const buyTransaction = await BuyTransactionModel.findById(req.params.id)
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
    await BuyTransactionModel.findOneAndDelete({
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

export async function updateBuyTransaction(req, res) {
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
