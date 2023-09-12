"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    entities: [`${path_1.default.join(__dirname, "entities/*.ts")}`],
    logging: false,
    synchronize: true,
});
