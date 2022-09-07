import express, { Request, Response } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import "colors"
import "dotenv/config"
// Set up app and port
const app = express()

const port = process.env.PORT || 3000

// Allow json and urlEncoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
)
// Welcome route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the hotel booking API")
})

app.use("/api/hotels", require("./modules/hotels/hotelRoutes"))
app.use("/api/auth", require("./modules/auth/authRoutes"))

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server started on port ${port}`.cyan.underline)
})
