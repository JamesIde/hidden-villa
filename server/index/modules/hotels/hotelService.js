"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all hotel rooms
// GET /api/hotels
// Public
const getHotelRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hotelRooms = yield prisma.hotelRoom.findMany({
        include: {
            images: true,
        },
    });
    res.status(200).json(hotelRooms);
});
// Add hotel rooms
// POST /api/hotels
// Public
const addHotelRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructure body
    const { name, price, description, numberOfBeds, maxGuests, images } = req.body;
    if (!name ||
        !price ||
        !description ||
        !numberOfBeds ||
        !maxGuests ||
        !images) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }
    console.log(req.body);
    try {
        // Create hotel room
        const hotelRoom = yield prisma.hotelRoom.create({
            data: {
                name,
                price,
                description,
                numberOfBeds,
                maxGuests,
                images: {
                    create: images.map((image) => ({
                        image: image,
                    })),
                },
            },
        });
        res.status(201).json(hotelRoom);
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
});
// Delete hotel rooms
// Delete /api/hotels
// Public
const deleteHotelRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Please provide an ID!" });
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
        yield prisma.user.deleteMany({
            where: {
                name: "james",
            },
        });
        res.status(200).json({ message: "Hotel room deleted successfully" });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error });
        }
        console.log(error);
    }
});
const hotelService = {
    getHotelRooms,
    addHotelRoom,
    deleteHotelRoom,
};
module.exports = hotelService;
// TODO - Update a hotel
