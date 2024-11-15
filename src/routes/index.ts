import { Request, Response, Router } from "express";
import userRouter from "./user.route";
import proRoute from "./pro.route";

let router: Router = Router()
router.get("/", (req: Request, res: Response) => { res.status(200).send({ message: "Assalomu aleykum" }) })
router.use("/users", userRouter)
router.use("/products", proRoute)

export default router