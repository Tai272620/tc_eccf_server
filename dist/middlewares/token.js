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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../services/jwt"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.default = {
    validateToken: function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.params.token ? String(req.params.token) : String(req.headers.token);
            let tokenObj = jwt_1.default.verifyToken(token);
            if (tokenObj) {
                let modelRes = yield user_model_1.default.inforById(tokenObj.id);
                if (modelRes.status) {
                    if (new Date((_a = modelRes.data) === null || _a === void 0 ? void 0 : _a.updateAt).toDateString() == new Date(tokenObj.updateAt).toDateString()) {
                        return next();
                    }
                }
            }
            return res.status(213).json({
                message: "Token không chính xác"
            });
        });
    }
};
