import { getCustomRepository } from "typeorm"
import AppError from "@shared/errors/AppError"
import UsersRepository from "../typeorm/repositories/UsersReposository"
interface IRequest {
    id: string
}

export class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const userReposository = getCustomRepository(UsersRepository)
        const user = await userReposository.findOne(id)

        if (!user) throw new AppError("Usuário não encontrado")
        await userReposository.remove(user)
    }
}
