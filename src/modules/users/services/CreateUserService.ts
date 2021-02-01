import User from "../infra/typeorm/entities/User"
import IHashProvider from "../providers/hashProvider/models/IHashProvider"
import AppError from "@shared/errors/AppError"
import IUsersInterface from "../repositories/IUsersRepository"
import {injectable,inject} from "tsyringe"
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider"

interface Request{
  name:string,
  email:string,
  password:string
}

// servico de criacao de usuarios 

@injectable()
export default class CreateUserService{

  constructor( 
    // injecao de dependencias
  @inject("UsersRepository") 
  private usersRepository:IUsersInterface,

  @inject("HashProvider")
  private hashProvider : IHashProvider,

  @inject("CacheProvider")
  private cacheProvider:ICacheProvider
  ){}

  public async execute({name,email,password}: Request): Promise<User>{


    const checkUsersExists = await this.usersRepository.findByEmail(email)

    if(checkUsersExists){
      throw new AppError("this user has already been registred")
    }
    const hashPassword = await this.hashProvider.generateHash(password)
    const user = this.usersRepository.create({
      name,
      email,
      password:hashPassword
    })

    await this.cacheProvider.invalidatePrefix("providers_list")
    return user
  }
}
