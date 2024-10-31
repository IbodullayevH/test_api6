import { UserController } from "controllers";
import { Router } from "express";


const userRouter = Router();

userRouter.get("/all", UserController.allUsersData);

export default userRouter;
