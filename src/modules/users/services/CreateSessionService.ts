/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "@shared/errors/AppError"
import { compare } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/UsersReposository"

interface IRequest {
    email: string
    password: string
}
interface IResponse {
    user: User
}

export class CreateSessionService {
    public async execute(
        { email, password }: IRequest,
        { user }: IResponse,
    ): Promise<IResponse | any> {
        const usersRepository = getCustomRepository(UsersRepository)
        const users = await usersRepository.findByEmail(email)
        const passwordConfirmed = compare(password, user.password)

        if (!users) throw new AppError("Senha ou Email inválido", 401)
        if (!passwordConfirmed) throw new AppError("Senha incorreta")

        return users
    }
}
