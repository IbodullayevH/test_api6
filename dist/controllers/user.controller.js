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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const typeorm_config_1 = require("config/typeorm.config");
const entities_1 = require("entities");
const errors_1 = require("errors");
class UserController {
    static allUsersData(_a) {
        return __awaiter(this, arguments, void 0, function* ({ req, res, next }) {
            try {
                const userRepository = typeorm_config_1.AppDataSource.getRepository(entities_1.User);
                const allUsers = yield userRepository.find();
                res.status(200).send({
                    message: "all users data",
                    data: allUsers
                });
            }
            catch (error) {
                next(new errors_1.ErrorHandler(error.message, error.status || 400));
            }
        });
    }
}
exports.UserController = UserController;
