import { Router } from "express"

const routes = Router()

routes.get("/", async (req, res) => {
    return res.json({ message: "Bem vindo a API" })
})

export default routes
