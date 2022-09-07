"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const client_1 = require("@prisma/client");
const genToken_1 = require("../utilities/genToken");
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password || !password2) {
        res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        // Check if username exists
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            res.status(400).json({ message: "User already exists" });
        }
        // Check if passwords match
        if (password !== password2) {
            res.status(400).json({ message: "Passwords do not match" });
        }
        // Hash the password
        const hashPwd = yield bcrypt.hash(password, 10);
        // Create user
        const newUser = yield prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPwd,
            },
        });
        if (newUser) {
            const refreshToken = yield (0, genToken_1.genRefreshToken)(newUser.id);
            res.cookie("bobject", refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            });
            res.status(201).json({
                success: true,
                accessToken: (0, genToken_1.genAccessToken)(newUser.id),
                name: newUser.name,
                email: newUser.email,
            });
        }
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Please enter all fields" });
    }
    // Check if user exists
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
        }
        // Match pwd
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
        }
        // Gen token
        const refreshToken = yield (0, genToken_1.genRefreshToken)(user.id);
        // Return cookie
        res.cookie("bobject", refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
        // Return user info
        res.status(201).json({
            success: true,
            accessToken: (0, genToken_1.genAccessToken)(user.id),
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
});
const getLoggedInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
        });
        if (user) {
            res.status(200).json({
                success: true,
                name: user.name,
                email: user.email,
                tokenVersion: user.tokenVersion,
            });
        }
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(403).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
});
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.bobject;
    if (!token) {
        res.status(403).json({ ok: false, accessToken: "" });
    }
    // Split the token
    // Attempt to verify the token
    let payload;
    try {
        payload = jwt.verify(token, process.env.REFRESH_SECRET);
        console.log("payload", payload);
    }
    catch (error) {
        res.status(403).json({ ok: false, accessToken: "" });
    }
    // Check if the user matches the user id
    const user = yield prisma.user.findUnique({
        where: {
            id: payload.id,
        },
    });
    if ((user === null || user === void 0 ? void 0 : user.id) !== payload.id) {
        res.status(403).json({ ok: false, accessToken: "" });
    }
    // Check if the token version matches, in the event someone gets hacked or forgets pwd.
    if ((user === null || user === void 0 ? void 0 : user.tokenVersion) !== payload.tokenVersion) {
        res.status(403).json({ ok: false, accessToken: "" });
    }
    res.status(200).json({
        success: true,
        accessToken: (0, genToken_1.genAccessToken)(user.id),
    });
});
const revokeRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const user = yield prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (!user) {
        res.status(403).json({ message: "User not found" });
    }
    yield prisma.user.update({
        where: {
            id: parseInt(id),
        },
        data: {
            tokenVersion: user.tokenVersion + 1,
        },
    });
    res.status(200).json({ success: true });
});
const authService = {
    register,
    login,
    getLoggedInUser,
    refreshAccessToken,
    revokeRefreshToken,
};
module.exports = authService;
