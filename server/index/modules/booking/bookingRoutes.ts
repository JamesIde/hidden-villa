import express from "express"

import {
  createCheckoutSession,
  paymentWebhook,
  getBooking,
} from "./bookingController"

const router = express.Router()

router.post("/create-checkout-session", createCheckoutSession)
router.post("/webhook", paymentWebhook)
router.get("/booking/:payment", getBooking)
export = router
