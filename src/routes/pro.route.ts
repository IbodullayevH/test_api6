import verificationToken from "../auth/verification.token";
import verifyRole from "../auth/verificationrole";
import { ProductsController } from "../controllers";
import { Router } from "express";
const proRoute: Router = Router()

proRoute.get("/all", verificationToken, verifyRole("admin"), ProductsController.allProductsData)
proRoute.get("/id/:id", verificationToken, verifyRole("admin"), ProductsController.getById)
proRoute.post("/new", verificationToken, verifyRole("admin"), ProductsController.newProduct)
proRoute.patch("/update/:id", verificationToken, verifyRole("admin"), ProductsController.updateProductData)

export default proRoute