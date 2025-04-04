import ProductModel from "../model/product.js";

export async function addProduct(req, res) {
  try {
    const product = await ProductModel.create(req.body);
    await product.populate("company");

    res.status(200).json({
      status: "success",
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

export async function getProducts(req, res) {
  try {
    const { companyId } = req.query;
    const products = await ProductModel.find({
      company: companyId,
    }).populate("company");

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "company"
    );
    res.status(200).json({
      status: "success",
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

export async function deleteProduct(req, res) {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("company");
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
