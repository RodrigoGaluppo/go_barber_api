import {Request,Response} from "express"
import { parseISO } from "date-fns"
import {container} from "tsyringe"
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService"

// controller faz a logica das rotas
export default class AppointmentControler{
    public async create(req:Request , res:Response):Promise<Response>{
        const { provider_id, date } = req.body
        const user_id = req.user.id
        const CreateAppointment = container.resolve(CreateAppointmentService)
        const appointment = await CreateAppointment.execute({ provider_id,date,user_id })
        return res.json(appointment)
    }
}