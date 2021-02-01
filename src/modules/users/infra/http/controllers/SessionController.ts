import {Request,Response} from "express"
import AuthenticateService from "@modules/users/services/AuthenticateService"
import {container} from "tsyringe"
import { classToClass } from "class-transformer"

// controller das sessoes que faz a aautenticacao dos usuarios quando logado
// autenticacao feita com o jwt que vem da injecao de dependencias usando o container do shared


export default class SessionConttoller{
    async create(req:Request,res:Response):Promise<Response>{
        const { email,password } = req.body

        const authenticateUser = container.resolve(AuthenticateService)

        const { user, token} = await authenticateUser.execute({
            email,password 
        })

        return res.json({
            user:classToClass(user),
            token
        })

        }
}