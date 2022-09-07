"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("./authController"));
const isAuth_1 = require("../utilities/isAuth");
const router = express_1.default.Router();
router.post("/register", authController_1.default.register);
router.post("/login", authController_1.default.login);
router.get("/refreshAccessToken", authController_1.default.refreshAccessToken);
router.get("/revokeRefreshToken", authController_1.default.revokeRefreshToken);
router.get("/profile", isAuth_1.isAuthenticated, authController_1.default.getLoggedInUser);
module.exports = router;
