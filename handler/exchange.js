import exchangeModel from "../model/exchange.js";

export async function getExchange(req, res) {
  try {
    const exchange = await exchangeModel.findById(req.prams.id);
    res.status(200).send({
      message: "success",
      data: {
        exchange,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
export async function getCurrent(req, res) {
  try {
    const exchange = await exchangeModel.findOne().sort("-createdAt");
    res.status(200).send({
      message: "success",
      data: {
        exchange,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function setExchange(req, res) {
  try {
    const exchange = await exchangeModel.create(req.body);
    res.status(200).send({
      message: "success",
      data: {
        exchange,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function updateExchange(req, res) {
  try {
    const exchange = await exchangeModel.findByIdAndUpdate(
      req.prams.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({
      message: "success",
      data: {
        exchange,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
