const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET);
const auth = require("../middleware/auth");

router.post("/checkout", auth, async (req, res) => {
  const { totalPrice } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "zar",
            product_data: { name: "Booking" },
            unit_amount: totalPrice * 100
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;