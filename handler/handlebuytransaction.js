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
    const buyTransaction = await BuyTransactionModel.findByIdAndUpdate(
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
      } else {
        const product = await ComposedProductsModel.create(products[i]);
        productsId[i] = product._id;
      }
    }
    const buyTransaction = await BuyTransactionModel.findByIdAndUpdate(
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
