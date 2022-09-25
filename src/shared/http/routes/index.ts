import productsRouter from "@modules/products/routes/products.routes"
import { Router } from "express"

const routes = Router()

routes.use("/products", productsRouter)

routes.get("/", async (req, res) => {
    return res.json({ message: "Bem vindo a API" })
})

export default routes
