import { Router } from "express";
import { UserController } from "../controllers";
import verificationToken from "../auth/verification.token";
import LoginUser from "../auth/login";
import verifyRole from "../auth/verificationrole";


const userRouter = Router();

userRouter.get("/all", verificationToken, UserController.allUsersData);
userRouter.post("/new", UserController.newUser);
userRouter.post("/login", LoginUser.getLogin);
userRouter.patch("/update/:id", verificationToken, verifyRole("user"), UserController.updateUserData);
userRouter.delete("/remove/:id", UserController.deleteUser);


export default userRouter;
