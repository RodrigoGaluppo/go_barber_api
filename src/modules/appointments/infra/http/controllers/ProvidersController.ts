import {Request,Response} from "express"
import { parseISO } from "date-fns"
import {container} from "tsyringe"
import ListProvidersService from "@modules/appointments/services/ListProvidersService"
import { classToClass } from "class-transformer"

// controller faz a logica das rotas
export default class ProvidersControler{
    public async index(req:Request , res:Response):Promise<Response>{
        const user_id  = req.user.id       
        const listProvidersService = container.resolve(ListProvidersService)
        const providers = await listProvidersService.execute({user_id})
        return res.json(classToClass(providers))
    }
}