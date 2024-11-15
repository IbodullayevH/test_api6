import { AppDataSource } from "../config/typeorm.config";
import { ErrorHandler } from "../errors";
import { Product } from "entities";
import { IProduct } from "interfaces/product.interface";

class ProductService {
    private productRepository = AppDataSource.getRepository(Product)

    async createProduct(productData: IProduct) {

        const existProduct = await this.productRepository.findOne({ where: { name: productData.name, category: productData.category } })

        if (existProduct) {
            throw new Error("Product already exists");
        }

        const newProduct = this.productRepository.create(productData)
        return (await this.productRepository.save(newProduct))
    }

    async getAllProducts() {
        return await this.productRepository.find()
    }

    async getProductById(id: number) {
        return await this.productRepository.findOneBy({ id });
    }

    // update Product
    async updateProduct(id: number, productData: IProduct) {

        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new ErrorHandler('Nout found', 404)
        }

        if (productData.name) {
            const checkQuantity = await this.productRepository.findOne({ where: { name: productData.name, category: productData.category } })
            if (checkQuantity) {
                throw new ErrorHandler(`The name ${productData.name} you entered to update is already taken`, 404);
            }
        }

        await this.productRepository.update(id, productData)
        return await this.productRepository.findOneBy({ id })
    }


    async removeProduct(id: number) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new ErrorHandler('Nout found', 404)
        }
        return await this.productRepository.remove(product)
    }
}

export default new ProductService()