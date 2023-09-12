"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    createToken: function (data, time) {
        // time(ms)
        try {
            return jsonwebtoken_1.default.sign(data, String(process.env.JWT_KEY), { expiresIn: `${time}` });
        }
        catch (err) {
            return false;
        }
    },
    verifyToken: function (token) {
        let result;
        try {
            jsonwebtoken_1.default.verify(token, String(process.env.JWT_KEY), function (err, decoded) {
                if (err) {
                    result = false;
                }
                else {
                    result = decoded;
                }
            });
            return result;
        }
        catch (err) {
            return false;
        }
    }
};
