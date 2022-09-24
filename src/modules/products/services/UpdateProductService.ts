import { ProductRepository } from "./../typeorm/repositories/ProductsRepository"
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product"
import AppError from "@shared/errors/AppError"

interface IRequest {
    id: string
    name: string
    price: number
    quantity: number
}

class UpdateProduct {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository)
        //FindByID
        const product = await productRepository.findOne(id)
        if (!product)
            throw new AppError(
                `Produto não encontrado com o ID: ${id} do `,
                400,
            )
        //FindByName
        const productExists = await productRepository.findByName(name)
        if (productExists && name !== product.name)
            throw new AppError("Já existe um produto com este node", 400)

        //Update
        product.name = name
        product.price = price
        product.quantity = quantity

        await productRepository.save(product)
        return product
    }
}

export default UpdateProduct
