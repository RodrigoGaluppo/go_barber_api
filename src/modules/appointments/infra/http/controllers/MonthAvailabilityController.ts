import {Request,Response} from "express"
import { parseISO } from "date-fns"
import {container} from "tsyringe"
import ProviderMonthAvailability from "@modules/appointments/services/ListProviderMonthAvailability"

// controller faz a logica das rotas
export default class ProvidersControler{
    public async index(req:Request , res:Response):Promise<Response>{
        const provider_id = req.params.provider_id
        const {month,year} = req.query     
        const listProvidersMonthAvailabilityService = container.resolve(ProviderMonthAvailability)
        const available = await listProvidersMonthAvailabilityService.execute({
            provider_id,month:Number(month),year:Number(year)
        })
        return res.json(available)
    }
}