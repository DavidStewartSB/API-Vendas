/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "@shared/errors/AppError"
import { compare } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/UsersReposository"

interface IRequest {
    email: string
    password: string
}

class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)
        const user = await usersRepository.findByEmail(email)
        if (!user) {
            throw new AppError("Senha ou Email inválido", 401)
        }

        const passwordConfirmed = await compare(password, user.password)
        if (!passwordConfirmed) {
            throw new AppError("Senha incorreta", 401)
        }

        return user
    }
}

export default CreateSessionService
