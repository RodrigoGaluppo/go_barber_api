import {Request,Response} from "express"
import ResetPasswordService from "@modules/users/services/ResetPasswordService"
import {container} from "tsyringe"

// controller das sessoes que faz a aautenticacao dos usuarios quando logado
// autenticacao feita com o jwt que vem da injecao de dependencias usando o container do shared


export default class ResetPasswordController{
    async create(req:Request,res:Response):Promise<Response>{
        const { Newpassword,token } = req.body

        const resetPasswordService = container.resolve(ResetPasswordService)

        await resetPasswordService.execute({
            Newpassword:Newpassword,token
        })

        return res.status(204).json()

        }
}