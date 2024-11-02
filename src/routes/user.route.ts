import { Router } from "express";
import { UserController } from "src/controllers";


const userRouter = Router();

userRouter.get("/all", UserController.allUsersData);
userRouter.post("/new", UserController.newUser);
userRouter.patch("/update/:id", UserController.updateUserData);
userRouter.delete("/remove/:id", UserController.deleteUser);

export default userRouter;
