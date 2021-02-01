import {Request,Response} from "express"
import { parseISO } from "date-fns"
import {container} from "tsyringe"
import ProviderDayAvailability from "@modules/appointments/services/ListProviderDayAvailabilty"

// controller faz a logica das rotas
export default class ProvidersControler{
    public async index(req:Request , res:Response):Promise<Response>{
        const provider_id = req.params.provider_id
        const {month,year,day} = req.query    
        const listProvidersDayAvailability = container.resolve(ProviderDayAvailability)
        
        
        const available = await listProvidersDayAvailability.execute({
            provider_id,year:Number(year),month:Number(month),day:Number(day)
        })
        
        
        return res.json(available)
    }
}