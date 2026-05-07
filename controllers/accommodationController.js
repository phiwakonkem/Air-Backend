const Accommodation = require("../models/Accommodation");

exports.createAccommodation = async (req, res) => {
  try {
    const newAccommodation = await Accommodation.create({
      ...req.body,
      host: req.user.id,
      image: req.file?.path 
    });

    res.status(201).json(newAccommodation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAccommodations = async (req, res) => {
  const data = await Accommodation.find().populate("host", "username email");
  res.json(data);
};

exports.deleteAccommodation = async (req, res) => {
  await Accommodation.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};