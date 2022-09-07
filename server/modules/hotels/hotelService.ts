import { Request, Response } from "express"
import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get all hotel rooms
// GET /api/hotels
// Public
const getHotelRooms = async (req: Request, res: Response) => {
  const hotelRooms = await prisma.hotelRoom.findMany({
    include: {
      images: true,
    },
  })
  res.status(200).json(hotelRooms)
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
  console.log(req.body)
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
    // await prisma.hotelRoom.delete({
    //   where: {
    //     roomId: parseInt(id),
    //   },
    //   include: {
    //     images: true,
    //   },
    // })
    await prisma.user.deleteMany({
      where: {
        name: "james",
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
  addHotelRoom,
  deleteHotelRoom,
}

export = hotelService

// TODO - Update a hotel
