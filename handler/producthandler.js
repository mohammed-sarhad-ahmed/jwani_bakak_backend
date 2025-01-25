import ProductModel from '../model/product.js';
import { pagination } from '../helper/pagination.js';
import { transactionModel } from '../model/transaction.js';

export async function addProduct(req, res) {
  try {
    const product = await ProductModel.create(req.body);
    await product.populate('company');

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function getProducts(req, res) {
  try {
    const { page = 1, limit = 10, companyId } = req.query;
    const skip = pagination(page, limit);
    if (req.query.page) {
      const numberProducts = await ProductModel.countDocuments();
      if (skip >= numberProducts && numberProducts !== 0) throw new Error('the page was not found');
    }
    const products = await ProductModel.find({
      company: companyId,
    })
      .populate('company')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await ProductModel.findById(req.params.id).populate('company');
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    await transactionModel.deleteMany({ product: req.params.id });

    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('company');
    res.status(200).json({
      message: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}
