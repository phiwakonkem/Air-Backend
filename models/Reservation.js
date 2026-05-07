const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);