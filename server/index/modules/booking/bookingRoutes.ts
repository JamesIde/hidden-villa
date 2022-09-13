import express from "express"
import bookingController from "./bookingController"
const router = express.Router()

router.post("/create-checkout-session", bookingController.createCheckoutSession)
router.post("/webhook", bookingController.paymentWebhook)
export = router
