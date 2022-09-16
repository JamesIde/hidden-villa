import express from "express"
import bookingController from "./bookingController"
const router = express.Router()

router.post("/create-checkout-session", bookingController.createCheckoutSession)
router.post("/webhook", bookingController.paymentWebhook)
router.get("/booking/:payment", bookingController.getBooking)
export = router
