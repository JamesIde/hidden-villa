import express, { Request, Response } from "express"
import userController from "./hotelController"
const router = express.Router()

router.get("/", userController.getHotelRooms)
router.post("/", userController.addHotelRoom)
router.delete("/:id", userController.deleteHotelRoom)
export = router
