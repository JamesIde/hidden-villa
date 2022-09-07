"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authService_1 = __importDefault(require("./authService"));
const register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authService_1.default.register(req, res);
}));
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authService_1.default.login(req, res);
}));
const refreshAccessToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authService_1.default.refreshAccessToken(req, res);
}));
const revokeRefreshToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authService_1.default.revokeRefreshToken(req, res);
}));
const getLoggedInUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authService_1.default.getLoggedInUser(req, res);
}));
const authController = {
    register,
    login,
    refreshAccessToken,
    revokeRefreshToken,
    getLoggedInUser,
};
module.exports = authController;
