import {Request,Response} from "express"
import { parseISO } from "date-fns"
import {container} from "tsyringe"
import ListProviderAppointmentService from "@modules/appointments/services/ListProviderAppointmentService"
import { classToClass } from "class-transformer"

// controller faz a logica das rotas
export default class ProvidersAppointmentsControler{
    public async index(req:Request , res:Response):Promise<Response>{
        const provider_id = req.user.id
        const {month,year,day} = req.query      
        const listProvidersAppointmentService = container.resolve(ListProviderAppointmentService)
        const appointments = await listProvidersAppointmentService.execute(
            {provider_id,month:Number(month),year:Number(year),day:Number(day)}
        )
        return res.json(classToClass(appointments))
    }
}