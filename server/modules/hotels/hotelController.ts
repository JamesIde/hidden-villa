import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import hotelService from "./hotelService"

const getHotelRooms = asyncHandler(async (req: Request, res: Response) => {
  return await hotelService.getHotelRooms(req, res)
})

const addHotelRoom = asyncHandler(async (req: Request, res: Response) => {
  return await hotelService.addHotelRoom(req, res)
})

const deleteHotelRoom = asyncHandler(async (req: Request, res: Response) => {
  return await hotelService.deleteHotelRoom(req, res)
})

const hotelController = {
  getHotelRooms,
  addHotelRoom,
  deleteHotelRoom,
}

export = hotelController
