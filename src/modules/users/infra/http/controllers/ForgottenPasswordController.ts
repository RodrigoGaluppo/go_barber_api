import {Request,Response} from "express"
import SendFrgottenPasswordEmailService from "@modules/users/services/SendForgottenPasswordEmailService"
import {container} from "tsyringe"

// controller das sessoes que faz a aautenticacao dos usuarios quando logado
// autenticacao feita com o jwt que vem da injecao de dependencias usando o container do shared


export default class ForgotPasswordController{
    async create(req:Request,res:Response):Promise<Response>{
        console.log(req.body)
        const { email } = req.body
   
        const sendForgottenPasswordService = container.resolve(SendFrgottenPasswordEmailService)

        await sendForgottenPasswordService.execute({
            email
        })

        return res.status(204).json()

        }
}