import { Router } from "express";
import {celebrate,Segments,Joi} from "celebrate"
import ProfileController  from "../controllers/ProfileController"
import  ensureAuthenticate from "../middlewares/ensure.Authenticate"


// rota de atualizacao usuarios logdos optimizada com os controllers fazendo as funcoes

const profileRouter = Router();
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticate)

profileRouter.put("/",profileController.update)

profileRouter.get("/",profileController.show)

export default profileRouter;
