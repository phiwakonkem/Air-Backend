const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createAccommodation,
  getAccommodations,
  deleteAccommodation
} = require("../controllers/accommodationController");

const auth = require("../middleware/auth");

router.get("/", getAccommodations);
router.delete("/:id", auth, deleteAccommodation);
router.post("/", auth, upload.single("image"), createAccommodation);

module.exports = router;