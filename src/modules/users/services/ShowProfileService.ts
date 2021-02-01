import User from "../infra/typeorm/entities/User"
import IUsersInterface from "../repositories/IUsersRepository"
import AppError from "@shared/errors/AppError"

import {injectable,inject} from "tsyringe"

// servico de update do avatar

interface Request{
  user_id:string
}

@injectable()
export default class ShowProfileService{

  constructor( 
    @inject("UsersRepository") private usersRepository:IUsersInterface,
    ){}

  public async execute({ user_id }:Request): Promise<User>{
    const user = await this.usersRepository.findById(user_id)

    if(!user){
        throw new AppError("user does not exist")
    }

    return user
  }
}
