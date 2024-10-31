import { Router } from "express";
import userRouter from "./user.route";

let router: Router = Router()
router.get("/", () => { "Salom" })
router.use("/users", userRouter)

export default router