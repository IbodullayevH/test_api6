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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = require("./middlewares");
const typeorm_config_1 = require("./config/typeorm.config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.default);
// salom
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_config_1.AppDataSource.initialize();
        console.log(`Database connected!`);
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server run on port: ${port}`);
        });
    }
    catch (err) {
        console.error(`Db error: ${err}`);
    }
});
startServer();
app.use("/*", middlewares_1.ErrorHandlerMiddleware.errorHandlerMiddleware);
