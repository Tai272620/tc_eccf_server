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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const text_1 = __importDefault(require("../text"));
const mail_1 = __importStar(require("../services/mail"));
const jwt_1 = __importDefault(require("../services/jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = {
    register: function (req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            /* Hash Password */
            req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
            try {
                /*  */
                let newUser = Object.assign(Object.assign({}, req.body), { createAt: new Date(Date.now()), updateAt: new Date(Date.now()) });
                let modelRes = yield user_model_1.default.register(newUser);
                modelRes.message = (0, text_1.default)(String(req.headers.language))[modelRes.message];
                /* Mail */
                if (modelRes.status) {
                    mail_1.default.sendMail({
                        to: `${(_a = modelRes.data) === null || _a === void 0 ? void 0 : _a.email}`,
                        subject: "Xác thực email",
                        html: mail_1.templates.emailConfirm({
                            confirmLink: `${process.env.SERVER_URL}auth/email-confirm/${jwt_1.default.createToken(modelRes.data, "300000")}`,
                            language: String(req.headers.language),
                            productName: 'Coffee Store',
                            productWebUrl: 'http://localhost:5173/',
                            receiverName: ((_b = modelRes.data) === null || _b === void 0 ? void 0 : _b.firstName) + "" + ((_c = modelRes.data) === null || _c === void 0 ? void 0 : _c.lastName)
                        })
                    });
                }
                return res.status(modelRes.status ? 200 : 213).json(modelRes);
            }
            catch (err) {
                return res.status(500).json({
                    message: (0, text_1.default)(String(req.headers.language)).controllerErr
                });
            }
        });
    },
    login: function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let modelRes = yield user_model_1.default.inforByUserName(req.body.userName);
                console.log("modelRes", modelRes);
                if (modelRes.status) {
                    if (!((_a = modelRes.data) === null || _a === void 0 ? void 0 : _a.isActive)) {
                        return res.status(213).json({
                            message: (0, text_1.default)(String(req.headers.language)).error001
                        });
                    }
                    let checkPassword = yield bcrypt_1.default.compare(req.body.password, modelRes.data.password);
                    if (!checkPassword) {
                        return res.status(213).json({
                            message: (0, text_1.default)(String(req.headers.language)).error002
                        });
                    }
                    return res.status(200).json({
                        message: (0, text_1.default)(String(req.headers.language)).success001,
                        token: jwt_1.default.createToken(modelRes.data, "1d")
                    });
                }
                return res.status(213).json({
                    message: (0, text_1.default)(String(req.headers.language)).error003
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: (0, text_1.default)(String(req.headers.language)).controllerErr
                });
            }
        });
    },
};
