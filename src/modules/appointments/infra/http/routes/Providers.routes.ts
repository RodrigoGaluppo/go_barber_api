import { Router } from "express";
import {celebrate,Segments,Joi} from "celebrate"
import ProvidersController from "../controllers/ProvidersController"
import ListProviderDayAvailability from "../controllers/ProviderDayAvailabilityController"
import ListProviderMonthAvailability from "../controllers/MonthAvailabilityController"
import ensureAuth from "@modules/users/infra/http/middlewares/ensure.Authenticate"

const providersRouter = Router();
const providersController = new ProvidersController()
const listProviderDayAvailability = new ListProviderDayAvailability()
const listProviderMonthAvailability = new ListProviderMonthAvailability()

providersRouter.use(ensureAuth)

providersRouter.get("/",providersController.index)

providersRouter.get("/:provider_id/month-availability",celebrate({
    [Segments.PARAMS]:{
        provider_id:Joi.string().uuid().required()
    }
}),listProviderMonthAvailability.index)

providersRouter.get("/:provider_id/day-availability",celebrate({
    [Segments.PARAMS]:{
        provider_id:Joi.string().uuid().required()
    }
}),listProviderDayAvailability.index)



export default providersRouter;
