import User from "@modules/users/infra/typeorm/entities/User"
import IUsersInterface from "@modules/users/repositories/IUsersRepository"
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider"
import { classToClass } from "class-transformer"


import {injectable,inject} from "tsyringe"

// servico de update do avatar

interface Request{
  user_id:string
}

@injectable()
export default class ListProvidersService{

  constructor( 
    @inject("UsersRepository") 
    private usersRepository:IUsersInterface,

    @inject("CacheProvider")
    private cacheProvider:ICacheProvider
    ){}

  public async execute({ user_id }:Request): Promise<User[]>{

    let users = await this.cacheProvider.recover<User[]>(`providers_list:${user_id}`)

    if(!users){
      users = await this.usersRepository.FindAllProviders({except_user_id:user_id})
      await this.cacheProvider.save(`providers_list:${user_id}`,classToClass(users))
    }

    return users

  }
}