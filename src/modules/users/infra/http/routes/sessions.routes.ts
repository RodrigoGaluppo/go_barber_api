import { Router } from "express";
import {celebrate,Segments,Joi} from "celebrate"
import SessionController from "../controllers/SessionController"

// rota de usuarios optimizada com os controllers fazendo as funcoes

const sessionRouter = Router();
const sessionController = new SessionController()

sessionRouter.post("/",celebrate({
  [Segments.BODY]:{
      email:Joi.string().email().required(),
      password:Joi.string().required()
  }  
}),sessionController.create)

export default sessionRouter
