import { Router } from "express";
import { UserController } from "../controllers/";


const userRouter = Router();

userRouter.get("/all", UserController.allUsersData);

export default userRouter;
