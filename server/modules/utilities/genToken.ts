import * as jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import "dotenv/config"
const prisma = new PrismaClient()
const genAccessToken = (id: number) => {
  return jwt.sign({ id }, process.env.ACCESS_SECRET!, {
    expiresIn: "15s", // change back to 30s
  })
}

const genRefreshToken = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  if (user) {
    return jwt.sign(
      { id, tokenVersion: user.tokenVersion },
      process.env.REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    )
  }
}

export { genAccessToken, genRefreshToken }
