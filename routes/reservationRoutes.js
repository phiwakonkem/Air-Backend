const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

const {
  createReservation,
  getUserReservations,
  getHostReservations,
  deleteReservation
} = require("../controllers/reservationController");

const auth = require("../middleware/auth");

router.post("/", auth, createReservation);
router.get("/user", auth, getUserReservations);
router.get("/host", auth, getHostReservations);
router.delete("/:id", auth, deleteReservation);
router.get("/unavailable/:id", async (req, res) => {
  const reservations = await Reservation.find({
    accommodation: req.params.id
  });

  res.json(reservations);
});

module.exports = router;