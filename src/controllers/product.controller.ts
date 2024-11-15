import { ErrorHandler } from "../errors";
import { NextFunction, Request, Response } from "express";
import { IProduct } from "interfaces";
import productService from "../services/product.service";

export class ProductsController {

    // all Products
    static async allProductsData(req: Request, res: Response, next: NextFunction) {
        try {
            const allProducts = await productService.getAllProducts()

            res.status(200).send({
                message: "all Products data",
                data: allProducts
            })

        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400))
        }
    }

    // create new Product
    static async newProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productData: IProduct = req.body
            const newProduct = await productService.createProduct(productData)

            res.status(201).send({
                message: "New product successfully created",
                data: newProduct
            });
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400));
        }
    }


    // search by id
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const product = await productService.getProductById(+id)

            res.status(200).send({
                message: `#${id} - id product data`,
                data: product
            })

        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400))
        }
    }

    // update Product
    static async updateProductData(req: Request, res: Response, next: NextFunction) {
        try {
            const productData: IProduct = req.body
            const { id } = req.params
            const updatedProduct = await productService.updateProduct(+id, productData)

            res.status(200).send({
                message: "Product data successfully updated",
                data: updatedProduct
            });
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400));
        }
    }


    static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await productService.removeProduct(+id)

            res.status(200).send({
                message: "Product successfully deleted"
            });
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400));

        }
    }
}

