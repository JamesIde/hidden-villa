import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import bookingService from "./bookingService"

export const createCheckoutSession = asyncHandler(
  async (req: Request, res: Response) => {
    return await bookingService.createCheckoutSession(req, res)
  }
)

export const paymentWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    return await bookingService.paymentWebhook(req, res)
  }
)

export const getBooking = asyncHandler(async (req: Request, res: Response) => {
  return await bookingService.getBooking(req, res)
})
