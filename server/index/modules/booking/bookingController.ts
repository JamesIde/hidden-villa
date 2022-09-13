import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import bookingService from "./bookingService"

const createCheckoutSession = asyncHandler(
  async (req: Request, res: Response) => {
    return await bookingService.createCheckoutSession(req, res)
  }
)

const paymentWebhook = asyncHandler(async (req: Request, res: Response) => {
  return await bookingService.paymentWebhook(req, res)
})

const bookingController = {
  createCheckoutSession,
  paymentWebhook,
}

export = bookingController
