"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const hotelController_1 = __importDefault(require("./hotelController"));
const router = express_1.default.Router();
router.get("/", hotelController_1.default.getHotelRooms);
router.post("/", hotelController_1.default.addHotelRoom);
router.delete("/:id", hotelController_1.default.deleteHotelRoom);
module.exports = router;
