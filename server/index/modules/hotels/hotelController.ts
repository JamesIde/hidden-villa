import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import hotelService from "./hotelService"

export const getHotelRooms = asyncHandler(
  async (req: Request, res: Response) => {
    return await hotelService.getHotelRooms(req, res)
  }
)

export const getHotelRoom = asyncHandler(
  async (req: Request, res: Response) => {
    return await hotelService.getHotelRoom(req, res)
  }
)

export const addHotelRoom = asyncHandler(
  async (req: Request, res: Response) => {
    return await hotelService.addHotelRoom(req, res)
  }
)

export const deleteHotelRoom = asyncHandler(
  async (req: Request, res: Response) => {
    return await hotelService.deleteHotelRoom(req, res)
  }
)
