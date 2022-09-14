import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import authService from "./authService"

const register = asyncHandler(async (req: Request, res: Response) => {
  return await authService.register(req, res)
})

const login = asyncHandler(async (req: Request, res: Response) => {
  return await authService.login(req, res)
})

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  return await authService.refreshAccessToken(req, res)
})

const revokeRefreshToken = asyncHandler(async (req: Request, res: Response) => {
  return await authService.revokeRefreshToken(req, res)
})

const getLoggedInUser = asyncHandler(async (req: Request, res: Response) => {
  return await authService.getLoggedInUser(req, res)
})

const getLatestBooking = asyncHandler(async (req: Request, res: Response) => {
  return await authService.getLatestBooking(req, res)
})
const authController = {
  register,
  login,
  refreshAccessToken,
  revokeRefreshToken,
  getLoggedInUser,
  getLatestBooking,
}

export = authController
