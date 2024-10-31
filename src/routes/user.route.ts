import { Router } from "express";
import { UserController } from "src/controllers";

const userRouter = Router();

userRouter.get("/all", UserController.allUsersData);

export default userRouter;
