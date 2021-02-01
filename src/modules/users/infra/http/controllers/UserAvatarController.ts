import {Request,Response} from "express"
import UpdateUserAavatarService from "@modules/users/services/updateUserAvatarService"
import {container} from "tsyringe"
import {classToClass} from "class-transformer"

// class do controller que faz a troca do avatar do usuario
// usa a inverso de dependecias da biblioteca com o container

export default class UserAvatarController{
    async update(req:Request,res:Response):Promise<Response>{
        const updateUserAavatar = container.resolve(UpdateUserAavatarService )
        const user = await updateUserAavatar.execute({
            user_id:req.user.id,
            avatar_fileName:req.file.filename
        })

        return res.json(classToClass(user))
    }
}