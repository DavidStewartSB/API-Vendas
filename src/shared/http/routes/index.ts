import productsRouter from "@modules/products/routes/products.routes"
import sessionsRouter from "@modules/users/routes/sessions.routes"
import usersRoutes from "@modules/users/routes/users.routes"
import { Router } from "express"

const routes = Router()

routes.use("/products", productsRouter)
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRouter)

routes.get("/", async (req, res) => {
    return res.json({ message: "Bem vindo a API" })
})

export default routes
