import { Router } from "express";
import {celebrate,Segments,Joi} from "celebrate"
import UserController from "../controllers/UserController"
import UserAvatarController from "../controllers/UserAvatarController"
import  ensureAuthenticate from "../middlewares/ensure.Authenticate"
import multer from "multer"
import uploadConfig from "@config/upload.config"

// rota de usuarios optimizada com os controllers fazendo as funcoes

const userRouter = Router();
const upload = multer(uploadConfig.multer)
const userController = new UserController()
const userAvatarController = new UserAvatarController()

userRouter.post("/",celebrate({
    [Segments.BODY]:{
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}),userController.create)
userRouter.patch("/avatar",ensureAuthenticate,upload.single("avatar"),userAvatarController.update)

export default userRouter;
