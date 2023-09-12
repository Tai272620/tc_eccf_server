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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    register: function (newUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield prisma.users.create({
                    data: newUser
                });
                return {
                    status: true,
                    data: user,
                    message: "registerSuccess"
                };
            }
            catch (err) {
                console.log("err", err);
                let message = "modelError";
                // type casting (as)
                switch ((_a = err.meta) === null || _a === void 0 ? void 0 : _a.target) {
                    case "users_userName_key":
                        message = "userNameDuplicate";
                        break;
                    case "users_email_key":
                        message = "emailDuplicate";
                        break;
                    default:
                }
                return {
                    status: false,
                    data: null,
                    message
                };
            }
        });
    },
    update: function (userId, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield prisma.users.update({
                    where: {
                        id: userId
                    },
                    data
                });
                return {
                    status: true,
                    data: user,
                    message: "update Success"
                };
            }
            catch (err) {
                console.log("err", err);
                let message = "modelError";
                // type casting (as)
                switch ((_a = err.meta) === null || _a === void 0 ? void 0 : _a.target) {
                    case "users_userName_key":
                        message = "userNameDuplicate";
                        break;
                    case "users_email_key":
                        message = "emailDuplicate";
                        break;
                    default:
                }
                return {
                    status: false,
                    data: null,
                    message
                };
            }
        });
    },
    inforById: function (userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield prisma.users.findUnique({
                    where: {
                        id: userId
                    }
                });
                return {
                    status: true,
                    data: user,
                    message: "Get infor Success"
                };
            }
            catch (err) {
                console.log("err", err);
                let message = "modelError";
                return {
                    status: false,
                    data: null,
                    message
                };
            }
        });
    },
    inforByUserName: function (userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield prisma.users.findUnique({
                    where: {
                        userName
                    }
                });
                if (!user) {
                    return {
                        status: false,
                        message: "Tên đăng nhập không tồn tại"
                    };
                }
                return {
                    status: true,
                    data: user,
                    message: "Lấy thông tin thành công!"
                };
            }
            catch (err) {
                let message = "modelErr";
                return {
                    status: false,
                    data: null,
                    message
                };
            }
        });
    }
};
