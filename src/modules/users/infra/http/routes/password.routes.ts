import { Router } from "express";
import {celebrate,Segments,Joi} from "celebrate"
import ForgotenPasswordController from "../controllers/ForgottenPasswordController"
import ResetPasswordController from "../controllers/ResetPasswordController"


// rota de edicao de senha usuarios optimizada com os controllers fazendo as funcoes

const passwordRouter = Router();
const forgotenPasswordController = new ForgotenPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post("/forgot",celebrate({
    [Segments.BODY]:{
        email: Joi.string().email().required()
    }
}),forgotenPasswordController.create)

passwordRouter.post("/reset",celebrate({
    [Segments.BODY]:{
        token: Joi.string().uuid().required(),
        Newpassword:Joi.string().required(),
        password_confirmation:Joi.string().required()
    }
}),resetPasswordController.create)

export default passwordRouter
