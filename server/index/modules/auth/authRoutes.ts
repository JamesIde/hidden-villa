import express from "express"
import {
  register,
  login,
  refreshAccessToken,
  revokeRefreshToken,
  getLoggedInUser,
  getLatestBooking,
} from "./authController"
import { isAuthenticated } from "../utilities/isAuth"
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/refreshAccessToken", refreshAccessToken)
router.get("/revokeRefreshToken", revokeRefreshToken)
router.get("/profile", isAuthenticated, getLoggedInUser)
router.get("/latestBooking", isAuthenticated, getLatestBooking)
export = router
