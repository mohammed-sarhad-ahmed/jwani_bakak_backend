import KleshModel from "../model/klesh";

export async function addKlesh(req, res) {
  try {
    const klesh = await KleshModel.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        klesh,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getKleshes(req, res) {
  try {
    const kleshes = await KleshModel.find();
    res.status(200).json({
      status: "success",
      data: {
        kleshes,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function getKlesh(req, res) {
  try {
    const klesh = await KleshModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        klesh,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
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
      status: "fail",
      message: error.message,
    });
  }
}

export async function updateKlesh(req, res) {
  try {
    const klesh = await KleshModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        klesh,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
