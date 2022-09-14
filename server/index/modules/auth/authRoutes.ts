import express from "express"
import authController from "./authController"
import { isAuthenticated } from "../utilities/isAuth"
const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/refreshAccessToken", authController.refreshAccessToken)
router.get("/revokeRefreshToken", authController.revokeRefreshToken)
router.get("/profile", isAuthenticated, authController.getLoggedInUser)
router.get("/latestBooking", isAuthenticated, authController.getLatestBooking)
export = router
