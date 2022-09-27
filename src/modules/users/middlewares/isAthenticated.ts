/* eslint-disable @typescript-eslint/no-unused-vars */
import authConfig from "@config/auth"
import { AppError } from "@shared/errors/AppError"
import { Response, NextFunction, Request } from "express"
import { request } from "http"
import { verify } from "jsonwebtoken"

interface TokenPayload {
    iat: number
    exp: number
    sub: string
}

export default function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const authHeader = req.headers.authorization

    if (!authHeader) throw new AppError("Usuário sem autorização")
    //Bearer token
    const [_, token] = authHeader.split(" ")

    try {
        const decodedToken = verify(token, authConfig.jwt.secret)
        const { sub } = decodedToken as TokenPayload

        req.user = {
            id: sub,
        }

        return next()
    } catch {
        throw new AppError("Token Inválido ")
    }
}
