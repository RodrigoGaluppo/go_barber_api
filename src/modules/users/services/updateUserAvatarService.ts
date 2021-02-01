import User from "../infra/typeorm/entities/User"
import path from "path"
import fs from "fs"
import IUsersInterface from "../repositories/IUsersRepository"
import uploadConfig from "@config/upload.config"
import AppError from "@shared/errors/AppError"
import IStorageProvider from "@shared/container/providers/storageProvider/models/IStorageProvider"
import {injectable,inject} from "tsyringe"

// servico de update do avatar

interface Request{
  user_id:string,
  avatar_fileName:string
}

@injectable()
export default class UpdateUserAavatarService{

  constructor( 
    @inject("UsersRepository") private usersRepository:IUsersInterface,

    @inject("StorageProvider") private storageProvider:IStorageProvider
    ){}

  public async execute({ user_id,avatar_fileName }:Request): Promise<User>{

    const user = await this.usersRepository.findById(user_id)

    if(!user){
      throw new AppError("you are not in the database")
    }

    if(user.avatar){
      // deletar avatar anterior
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatar_fileName)

    user.avatar = filename

    await this.usersRepository.save(user)

    return user
  }
}
