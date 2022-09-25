import { DeleteUserService } from "./../services/DeleteUserService"
import { CreateUserService } from "./../services/CreateUserService"
import { Response } from "express"
import { Request } from "express"
import { ListUserService } from "../services/ListUserService"
export default class UsersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listUser = new ListUserService()

        const users = listUser.execute()
        return res.json({ success: true, users })
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body
        const createUser = new CreateUserService()
        const user = await createUser.execute({ name, email, password })

        return res.json({ message: "Usuário criado com sucesso!", user })
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const deleteUser = new DeleteUserService()
        await deleteUser.execute({ id })

        return res.json({
            success: true,
            message: "usuário com deletado com sucesso",
        })
    }
}
