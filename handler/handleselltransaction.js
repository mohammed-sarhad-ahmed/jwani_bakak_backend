import SellTransactionModel from "../model/selltransaction.js";
import ComposedProductsModel from "../model/composedProducts.js";

export async function addSellTransaction(req, res) {
  try {
    const { products: composedProducts, ...others } = req.body;
    const products = await ComposedProductsModel.insertMany(composedProducts);
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
    const sellTransaction = await SellTransactionModel.findByIdAndUpdate(
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

export async function updateComposed(req, res) {
  try {
    const products = req.body;
    const productsId = [];
    for (let i = 0; i < products.length; i++) {
      const product = await ComposedProductsModel.findById(products[i]._id);
      if (product) {
        product.pricePerUnit = products[i].pricePerUnit;
        product.quantity = products[i].quantity;
        productsId[i] = products[i]._id;
      }
    }
    const sellTransaction = await SellTransactionModel.findByIdAndUpdate(
      req.params.id,
      {
        products: productsId,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({
      message: "success",
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
