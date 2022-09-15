import { Request, Response } from "express"
import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get all hotel rooms
// POST /api/hotels
// Public
const getHotelRooms = async (req: Request, res: Response) => {
  const { originalCheckIn, originalCheckOut, NoGuests } = req.body
  if (!originalCheckIn || !originalCheckOut || !NoGuests) {
    res.status(400).json({
      message: "Please provide start and end dates and number of guests",
    })
  }
  try {
    const hotelRooms = await prisma.hotelRoom.findMany({
      where: {
        NOT: {
          Booking: {
            some: {
              AND: [
                {
                  checkIn: {
                    lte: originalCheckIn,
                  },
                },
                {
                  checkOut: {
                    gte: originalCheckOut,
                  },
                },
              ],
            },
          },
        },
        maxGuests: {
          gte: parseInt(NoGuests),
        },
        AND: {
          maxGuests: {
            lte: parseInt(NoGuests) + 1,
          },
        },
      },
      include: {
        images: true,
      },
    })

    if (!hotelRooms) {
      res
        .status(404)
        .json({ message: "No rooms found with your desired dates" })
    }
    res.status(200).json(hotelRooms)
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: error })
    }
    console.log(error)
  }
}
// Get single hotel room
// GET /api/hotels/singleHotel/:id
// Public
const getHotelRoom = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    res.status(400).json({ message: "Please provide an ID!" })
  }
  try {
    const hotelRoom = await prisma.hotelRoom.findUnique({
      where: {
        roomId: parseInt(id),
      },
      include: {
        images: true,
      },
    })

    if (!hotelRoom) {
      res.status(404).json({ message: "Hotel room not found" })
    }

    res.status(200).json(hotelRoom)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: error })
    }
    console.log(error)
  }
}

// Add hotel rooms
// POST /api/hotels
// Public
const addHotelRoom = async (req: Request, res: Response) => {
  // Destructure body
  const { name, price, description, numberOfBeds, maxGuests, images } = req.body

  if (
    !name ||
    !price ||
    !description ||
    !numberOfBeds ||
    !maxGuests ||
    !images
  ) {
    res.status(400)
    throw new Error("Please provide all required fields")
  }
  try {
    // Create hotel room
    const hotelRoom = await prisma.hotelRoom.create({
      data: {
        name,
        price,
        description,
        numberOfBeds,
        maxGuests,
        images: {
          create: images.map((image: any) => ({
            image: image,
          })),
        },
      },
    })
    res.status(201).json(hotelRoom)
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: error })
    }
  }
}
// Delete hotel rooms
// Delete /api/hotels
// Public
const deleteHotelRoom = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({ message: "Please provide an ID!" })
  }
  try {
    // Delete hotel room and all images associated with it
    await prisma.booking.delete({
      where: {
        bookingId: parseInt(id),
      },
    })

    res.status(200).json({ message: "Hotel room deleted successfully" })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: error })
    }
    console.log(error)
  }
}

const hotelService = {
  getHotelRooms,
  getHotelRoom,
  addHotelRoom,
  deleteHotelRoom,
}

export = hotelService

// TODO - Update a hotel. Low priority, probably as part of admin panel.
