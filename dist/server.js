"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
/* create server */
const server = (0, express_1.default)();
/* Setup cors */
const cors_1 = __importDefault(require("cors"));
server.use((0, cors_1.default)());
/* Setup body-parser */
const body_parser_1 = __importDefault(require("body-parser"));
server.use(body_parser_1.default.json());
/* Setup api config */
const route_1 = __importDefault(require("./route"));
const guard_1 = __importDefault(require("./middlewares/guard"));
server.use('/api', guard_1.default.ipAuthen, route_1.default);
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    // console.log(`AdminJS started on http://localhost:${process.env.SERVER_PORT}${admin.options.rootPath}`);
});
