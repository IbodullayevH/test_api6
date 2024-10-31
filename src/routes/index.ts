import { Request, Response, Router } from "express";
import userRouter from "./user.route";

let router: Router = Router()
router.get("/", (req: Request, res: Response) => { res.status(200).send({ message: "Assalomu aleykum" }) })
router.use("/users", userRouter)

export default router