"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("colors");
require("dotenv/config");
// Set up app and port
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Allow json and urlEncoded data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Cookie parser
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:4200",
    credentials: true,
}));
// Welcome route
app.get("/", (req, res) => {
    res.send("Welcome to the hotel booking API");
});
app.use("/api/hotels", require("./modules/hotels/hotelRoutes"));
app.use("/api/auth", require("./modules/auth/authRoutes"));
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server started on port ${port}`.cyan.underline);
});
