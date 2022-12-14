import { Request, Response } from "express"
import Stripe from "stripe"
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-08-01",
})

const createCheckoutSession = async (req: Request, res: Response) => {
  console.log("received in checkout", req.body)
  try {
    const {
      roomName,
      totalCost,
      duration,
      hotelId,
      roomId,
      checkIn,
      checkOut,
      guests,
      userID,
      firstName,
      lastName,
      phone,
      email,
    } = req.body
    // Create stripe customer
    const customer = await stripe.customers.create({
      metadata: {
        id: userID,
        name: firstName + " " + lastName,
        email: email,
        phone: phone,
      },
    })

    // Formatting the dates

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: roomName,
              description: `Stay at ${roomName} for ${duration} nights between ${checkIn} and ${checkOut}`,
            },
            unit_amount: totalCost * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        duration: duration,
        hotelId: hotelId,
        roomId: roomId,
        checkIn: checkIn,
        checkOut: checkOut,
        totalCost: totalCost,
        roomName: roomName,
      },
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.CLIENT_DOMAIN}/booking/payment-success`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/rooms`,
    })
    res.status(200).json(session.id)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const paymentWebhook = async (req: Request, res: Response) => {
  const event = req.body

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      try {
        // Access session object
        const session = event.data.object
        // Create our booking
        console.log("Session completed", session)
        const customer = await stripe.customers.retrieve(session.customer)
        console.log(customer)
        // Create our booking
        await createBooking(session, customer, req, res)
      } catch (error) {
        console.log("error", error)
      }
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end
}

const createBooking = async (
  session: any,
  customer: any,
  req: Request,
  res: Response
) => {
  try {
    const booking = await prisma.booking.create({
      data: {
        checkIn: session.metadata.checkIn,
        checkOut: session.metadata.checkOut,
        totalCost: session.metadata.totalCost,
        paymentStatus: session.payment_status,
        duration: session.metadata.duration,
        roomId: parseInt(session.metadata.roomId),
        id: parseInt(customer.metadata.id),
        phone: customer.metadata.phone,
        paymentID: session.payment_intent,
      },
    })
    console.log("booking", booking)
    res.status(201).json(booking)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: error })
    }
    console.log(error)
  }
}

const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await prisma.booking.findFirst({
      where: {
        paymentID: req.params.payment,
      },
      include: {
        bookedRoom: true,
        customer: true,
      },
    })
    res.status(200).json(booking)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const bookingService = {
  createCheckoutSession,
  paymentWebhook,
  getBooking,
}

export = bookingService
