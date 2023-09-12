"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const en_1 = __importDefault(require("./en"));
const vi_1 = __importDefault(require("./vi"));
exports.default = (lang) => {
    let text;
    switch (lang) {
        case 'en':
            text = en_1.default;
            break;
        case 'vi':
            text = vi_1.default;
            break;
        default:
            text = en_1.default;
    }
    return text;
};
