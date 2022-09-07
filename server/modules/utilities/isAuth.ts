import { Request, Response } from "express"

import * as jwt from "jsonwebtoken"

export const isAuthenticated = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization?.split(" ")[1]

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as string
    // Add user from payload
    req.user = decoded
    next()
  } catch (e: any) {
    console.log(e.message)
    res.status(401).json({ message: "Invalid Token" })
  }
}
