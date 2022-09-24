import { EntityRepository, Repository } from "typeorm"
import Product from "../entities/Product"

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async findByName(name: string): Promise<Product | any> {
        const product = this.findOne({ where: { name } })

        return product
    }
}
