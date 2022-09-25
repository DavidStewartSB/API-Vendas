import { UsersRepository } from "./../typeorm/repositories/UsersReposository"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"

export class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository)
        const users = await usersRepository.find()

        return users
    }
}
