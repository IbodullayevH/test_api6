"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("controllers");
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.get("/all", controllers_1.UserController.allUsersData);
exports.default = userRouter;
