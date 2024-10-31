import { Router } from "express";
import { UserController } from "src/controllers";


const userRouter = Router();

userRouter.get("/all", UserController.allUsersData);
userRouter.post("/new", UserController.newUser);

export default userRouter;
    