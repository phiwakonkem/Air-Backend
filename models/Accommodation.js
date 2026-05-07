const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  guests: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String],
  images: String,
  image: String,
  description: String,

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Accommodation", accommodationSchema);