import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import cors from "cors"
import routes from "./routes"
import "@shared/typeorm"
import { errors } from "celebrate"
import { AppError } from "@shared/errors/AppError"

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use(errors())
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError)
        return res
            .status(error.statusCode)
            .json({ status: "error", message: error.message })

    return res
        .status(500)
        .json({ status: "error", message: "Internal server error" })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta localhost:3000! 🎉")
})
