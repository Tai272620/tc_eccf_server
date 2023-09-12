"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = __importDefault(require("../text"));
let ipList = [
    "::ffff:127.0.0.1",
    "58.187.191.113"
];
exports.default = {
    ipAuthen: function (req, res, next) {
        let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (ipList.find(ip => ip == String(ipAddress))) {
            return next();
        }
        return res.status(213).json({
            status: false,
            message: (0, text_1.default)(String(req.headers.language)).ipAcceptDenine,
            data: null
        });
    }
};
