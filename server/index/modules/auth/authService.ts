import { Request, Response } from "express"
import { Prisma, PrismaClient } from "@prisma/client"
import { genAccessToken, genRefreshToken } from "../utilities/genToken"
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
const prisma = new PrismaClient()

const register = async (req: Request, res: Response) => {
  const { name, email, password, password2 } = req.body

  if (!name || !email || !password || !password2) {
    res.status(400).json({ message: "Please enter all fields" })
  }

  try {
    // Check if username exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (user) {
      res.status(400).json({ message: "User already exists" })
    }

    // Check if passwords match
    if (password !== password2) {
      res.status(400).json({ message: "Passwords do not match" })
    }

    // Hash the password
    const hashPwd = await bcrypt.hash(password, 10)

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPwd,
      },
    })

    if (newUser) {
      const refreshToken = await genRefreshToken(newUser.id)

      res.cookie("bobject", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })

      res.status(201).json({
        success: true,
        accessToken: genAccessToken(newUser.id),
        name: newUser.name,
        email: newUser.email,
      })
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: error })
    }
  }
}

const login = async (req: Request, res: Response) => {
  console.log(req.body)
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "Please enter all fields" })
  }
  // Check if user exists
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })!

    if (!user) {
      res.status(400).json({ message: "User does not exist" })
    }

    // Match pwd
    const isMatch = await bcrypt.compare(password, user!.password)

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" })
    }

    // Gen token
    const refreshToken = await genRefreshToken(user!.id)

    // Return cookie
    res.cookie("bobject", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    // Return user info
    res.status(201).json({
      success: true,
      accessToken: genAccessToken(user!.id),
      name: user!.name,
      email: user!.email,
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: error })
    }
  }
}

const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    })

    if (user) {
      res.status(200).json({
        success: true,
        name: user.name,
        email: user.email,
        tokenVersion: user.tokenVersion,
      })
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(403).json({ error: error.message })
    } else {
      res.status(500).json({ error: error })
    }
  }
}

const refreshAccessToken = async (req: Request, res: Response) => {
  const token = req.cookies.bobject

  if (!token) {
    res.status(403).json({ ok: false, accessToken: "" })
  }
  // Split the token

  // Attempt to verify the token
  let payload: any

  try {
    payload = jwt.verify(token, process.env.REFRESH_SECRET as string) as any // TODO Fix this
    console.log("payload", payload)
  } catch (error: any) {
    res.status(403).json({ ok: false, accessToken: "" })
  }

  // Check if the user matches the user id
  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  })
  if (user?.id !== payload.id) {
    res.status(403).json({ ok: false, accessToken: "" })
  }

  // Check if the token version matches, in the event someone gets hacked or forgets pwd.
  if (user?.tokenVersion !== payload.tokenVersion) {
    res.status(403).json({ ok: false, accessToken: "" })
  }
  res.status(200).json({
    success: true,
    accessToken: genAccessToken(user!.id),
  })
}

const revokeRefreshToken = async (req: Request, res: Response) => {
  const { id } = req.body
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (!user) {
    res.status(403).json({ message: "User not found" })
  }

  await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      tokenVersion: user!.tokenVersion + 1,
    },
  })

  res.status(200).json({ success: true })
}

const authService = {
  register,
  login,
  getLoggedInUser,
  refreshAccessToken,
  revokeRefreshToken,
}
export = authService
