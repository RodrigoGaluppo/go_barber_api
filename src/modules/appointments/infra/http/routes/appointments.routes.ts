import { Router } from "express";
import {celebrate,Segments,Joi} from "celebrate"
import AppointmentController from "../controllers/AppointmentController"
import ProviderAppointmentController from "../controllers/ProviderAppointmentsController"
import ensureAuth from "@modules/users/infra/http/middlewares/ensure.Authenticate"

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentController()
const providerAppointmentsController = new ProviderAppointmentController()

appointmentsRoutes.use(ensureAuth)

appointmentsRoutes.get("/me",providerAppointmentsController.index)
appointmentsRoutes.post("/",celebrate({
  [Segments.BODY]:{
    provider_id:Joi.string().uuid().required(),
    date:Joi.date()
  }
}),appointmentsController.create)

/*appointmentsRoutes.get("/",async (req,res)=>{
  const appointments = await appointmentRepository.find()
  res.json(appointments)
})
*/
export default appointmentsRoutes;
