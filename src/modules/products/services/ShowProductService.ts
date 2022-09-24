import { getCustomRepository } from "typeorm"
import { ProductRepository } from "./../typeorm/repositories/ProductsRepository"
import Product from "../typeorm/entities/Product"
import AppError from "@shared/errors/AppError"

interface IRequest {
    id: string
}

class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product | any> {
        const productRepository = getCustomRepository(ProductRepository)
        const productId = productRepository.findOne(id)

        if (!productId) {
            throw new AppError("Produto não encontrado", 400)
        }
        return productId
    }
}

export default ShowProductService
