require('dns').setDefaultResultOrder('ipv4first');
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express(); 

console.log("MONGO_URI:", process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/accommodations", require("./routes/accommodationRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/payments", require("./routes/checkoutRoutes"));

// Production build (frontend)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../airbnb-frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../airbnb-frontend/build", "index.html"));
  });
}

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));