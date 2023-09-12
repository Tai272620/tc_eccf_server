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
const user_model_1 = __importDefault(require("../models/user.model"));
const text_1 = __importDefault(require("../text"));
const jwt_1 = __importDefault(require("../services/jwt"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
exports.default = {
    confirmEmail: function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tokenObj = jwt_1.default.verifyToken(String(req.params.token));
                if (tokenObj) {
                    let modelRes = yield user_model_1.default.inforById(tokenObj.id);
                    if (modelRes.status) {
                        let modelUpdateRes = yield user_model_1.default.update((_a = modelRes.data) === null || _a === void 0 ? void 0 : _a.id, { emailConfirm: true, updateAt: new Date(Date.now()) });
                        return res
                            .status(modelUpdateRes.status ? 200 : 213)
                            .send(modelUpdateRes.status ? yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../templates/emailActived.ejs")) : "Xác thực thất bại, vui lòng thử lại!");
                    }
                }
                return res.status(500).json({});
                // console.log("tokenObj", tokenObj);
            }
            catch (err) {
                return res.status(500).json({
                // message: (Text(String(req.headers.language))
                });
            }
        });
    },
    authentication: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tokenObj = jwt_1.default.verifyToken(String(req.headers.token));
                if (tokenObj) {
                    let modelRes = yield user_model_1.default.inforById(tokenObj.id);
                    return res.status(modelRes.status ? 200 : 213).json(modelRes);
                }
            }
            catch (err) {
                return res.status(500).json({
                    messsage: (0, text_1.default)(String(req.headers.language)).controllerErr
                });
            }
        });
    }
};
