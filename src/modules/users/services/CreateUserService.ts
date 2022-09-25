/* eslint-disable @typescript-eslint/no-explicit-any */

import { UsersRepository } from "./../typeorm/repositories/UsersReposository"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import AppError from "@shared/errors/AppError"

interface IRequest {
    name: string
    email: string
    password: string
}

export class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: IRequest): Promise<User | any> {
        const userRepository = getCustomRepository(UsersRepository)
        const emailExists = await userRepository.findByEmail(email)
        if (emailExists) throw new AppError("Endereço de Email sendo utilizado")

        const user = userRepository.create({ name, email, password })
        await userRepository.save(user)
        return user
    }
}
