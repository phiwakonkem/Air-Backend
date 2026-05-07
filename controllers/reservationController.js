const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
  try {
    const { startDate, endDate, accommodation } = req.body;

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const conflict = await Reservation.findOne({
      accommodation,
      $or: [
        {
          startDate: { $lt: new Date(endDate) },
          endDate: { $gt: new Date(startDate) }
        }
      ]
    });

    if (conflict) {
      return res.status(400).json({
        message: "This accommodation is already booked for selected dates"
      });
    }

    const reservation = await Reservation.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id })
      .populate("accommodation");

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHostReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate({
        path: "accommodation",
        match: { host: req.user.id }
      });

    const filtered = reservations.filter(r => r.accommodation);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};