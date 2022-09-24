import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import routes from "./routes"
import AppError from "@shared/errors/AppError"
import "@shared/typeorm"

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res
            .status(err.statusCode)
            .json({ status: "error", message: err.message })
    }

    return res
        .status(500)
        .json({ status: "error", message: "Internal server error" })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta localhost:3000! 🎉")
})
