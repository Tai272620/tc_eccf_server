"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const token_1 = __importDefault(require("../../middlewares/token"));
const router = express_1.default.Router();
router.get('/email-confirm/:token', token_1.default.validateToken, auth_controller_1.default.confirmEmail);
router.get('/', token_1.default.validateToken, auth_controller_1.default.authentication);
exports.default = router;
