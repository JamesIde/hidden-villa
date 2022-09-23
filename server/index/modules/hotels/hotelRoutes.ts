import express from "express"
import {
  getHotelRooms,
  getHotelRoom,
  addHotelRoom,
  deleteHotelRoom,
} from "./hotelController"
const router = express.Router()

router.post("/", getHotelRooms)
router.get("/:id", getHotelRoom)
router.post("/", addHotelRoom)
router.delete("/:id", deleteHotelRoom)
export = router
