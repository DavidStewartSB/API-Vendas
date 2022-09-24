import { getCustomRepository } from "typeorm"
import { ProductRepository } from "./../typeorm/repositories/ProductsRepository"
import AppError from "@shared/errors/AppError"

interface IRequest {
    id: string
}

class DeleteProduct {
    public async execute({ id }: IRequest): Promise<void> {
        const productRepository = getCustomRepository(ProductRepository)
        const product = await productRepository.findOne(id)

        if (!product) {
            throw new AppError(`Produto com id: ${id} não encontrado`, 400)
        }

        await productRepository.remove(product)
    }
}

export default DeleteProduct
