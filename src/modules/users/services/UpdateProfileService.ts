import User from "../infra/typeorm/entities/User"
import IUsersInterface from "../repositories/IUsersRepository"
import AppError from "@shared/errors/AppError"
import IHashProvider from "../providers/hashProvider/models/IHashProvider"
import {injectable,inject} from "tsyringe"

// servico de update do avatar

interface Request{
  user_id:string
  name:string,
  email:string,
  old_password?:string
  password?:string
}

@injectable()
export default class UpdateProfileService{

  constructor( 
    @inject("UsersRepository") private usersRepository:IUsersInterface,

    @inject("HashProvider") private hashProvider:IHashProvider
    ){}

  public async execute({ user_id,name,email,password,old_password }:Request): Promise<User>{
    const user = await this.usersRepository.findById(user_id)

    if(!user){
        throw new AppError("user does not exist")
    }

    const isEmailUsed = await this.usersRepository.findByEmail(email)

    if(isEmailUsed && isEmailUsed.id !== user.id){
        throw new AppError("this Email is already used")
    }

    user.name = name
    user.email = email

    if(password && !old_password ){
        throw new AppError("old password is required")
    }

    if(password && old_password){
        const checkOldPassword = await this.hashProvider.compareHash(old_password,user.password)

        if(!checkOldPassword){
            throw new AppError("old password does not match")
        }

        user.password = await this.hashProvider.generateHash(password)
    }

    const newUser = await this.usersRepository.save(user)
    return newUser
  }
}
