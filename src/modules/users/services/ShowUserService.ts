/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import AppError from "@shared/errors/AppError"
import UsersRepository from "../typeorm/repositories/UsersReposository"

interface IRequest {
    id: string
}

export class ShowUserService {
    public async execute({ id }: IRequest): Promise<User | any> {
        const userRepository = getCustomRepository(UsersRepository)
        const userId = userRepository.findOne(id)

        if (!userId) throw new AppError("Usuário com id Inválido")

        return userId
    }
}
