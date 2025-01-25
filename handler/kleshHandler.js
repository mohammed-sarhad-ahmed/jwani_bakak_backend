import { pagination } from '../helper/pagination.js';
import KleshModel from '../model/klesh.js';

export async function addKlesh(req, res) {
  try {
    const klesh = await KleshModel.create(req.body);
    await klesh.populate('company');
    res.status(200).json({
      status: 'success',
      data: {
        klesh,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function getKleshes(req, res) {
  try {
    const { page = 1, limit = 10, companyId } = req.query;
    const skip = pagination(page, limit);
    if (req.query.page) {
      const numberOfKlesh = await KleshModel.countDocuments();
      if (skip >= numberOfKlesh && numberOfKlesh !== 0) throw new Error('the page was not found');
    }
    const kleshes = await KleshModel.find({
      company: companyId,
    })
      .populate('company')
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      status: 'success',
      results: kleshes.length,
      data: {
        kleshes,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function getKlesh(req, res) {
  try {
    const klesh = await KleshModel.findById(req.params.id).populate('company');
    res.status(200).json({
      status: 'success',
      data: {
        klesh,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function deleteKlesh(req, res) {
  try {
    await KleshModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

export async function updateKlesh(req, res) {
  try {
    const klesh = await KleshModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('company');

    res.status(200).json({
      status: 'success',
      data: {
        klesh,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}
