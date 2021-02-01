import {Request,Response} from "express"
import UpdateProfileService from "@modules/users/services/UpdateProfileService"
import {container} from "tsyringe"
import ShowProfileService from "@modules/users/services/ShowProfileService"
import {classToClass} from "class-transformer"

// controller dos users , faz a logica das rotas nos metodos

export default class ProfileController{

    public async show(req:Request,res:Response):Promise<Response>{
        const user_id = req.body
        const showProfileService = container.resolve(ShowProfileService)
        const user = await showProfileService.execute(user_id)

        return res.json(classToClass(user))
    }

    async update(req:Request,res:Response):Promise<Response>{
        const { name,email,password,old_password } = req.body
        const user_id = req.user.id
        const updateProfile = container.resolve(UpdateProfileService)
        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            password,
            old_password
        })
      
        return res.json(classToClass(user))
    }
}