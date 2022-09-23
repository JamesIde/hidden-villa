import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import authService from "./authService"

export const register = asyncHandler(async (req: Request, res: Response) => {
  return await authService.register(req, res)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  return await authService.login(req, res)
})

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    return await authService.refreshAccessToken(req, res)
  }
)

export const revokeRefreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    return await authService.revokeRefreshToken(req, res)
  }
)

export const getLoggedInUser = asyncHandler(
  async (req: Request, res: Response) => {
    return await authService.getLoggedInUser(req, res)
  }
)

export const getLatestBooking = asyncHandler(
  async (req: Request, res: Response) => {
    return await authService.getLatestBooking(req, res)
  }
)
