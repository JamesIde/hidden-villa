import express from "express"
import userController from "./hotelController"
const router = express.Router()

router.get("/", userController.getHotelRooms)
router.get("/:id", userController.getHotelRoom)
router.post("/", userController.addHotelRoom)
router.delete("/:id", userController.deleteHotelRoom)
export = router
