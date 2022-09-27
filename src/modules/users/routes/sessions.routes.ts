import { Joi } from "celebrate"
import { Segments } from "celebrate"
import { celebrate } from "celebrate"
import { Router } from "express"
import SessionsController from "../controllers/SessionsController"

const sessionsRouter = Router()
const sessionController = new SessionsController()

sessionsRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    sessionController.create,
)

export default sessionsRouter
