import User from "../infra/typeorm/entities/User"

import { sign } from "jsonwebtoken"
import authConfig from "@config/auth.config"
import AppError from "@shared/errors/AppError"
import IUsersInterface from "../repositories/IUsersRepository"
import {injectable,inject} from "tsyringe"
import IHashProvider from "../providers/hashProvider/models/IHashProvider"

interface Request{
  email:string
  password:string
}

// servico de authenticacao de usurios faz a regra de negocios da rota e retorna o token

@injectable()
export default class AuthenticateService{
  
  constructor( 
    @inject("UsersRepository") private usersRepository:IUsersInterface,
    @inject("HashProvider") private hashProvider : IHashProvider
    ){}

  public async execute({ email,password }:Request) :Promise<{user:User,token:string}> {
    const user = await this.usersRepository.findByEmail(email)
    if(!user){
      throw new AppError(" incorrect email/password combination ",401)
    }

    const passwordMatched = await this.hashProvider.compareHash(password,user.password)

    if(!passwordMatched){
      throw new AppError(" incorrect email/password combination ",401)
    }

    const { secret,expiresIn } = authConfig.jwt
   
    if(!secret){
      throw new AppError("secret must be in path")
    }
    
    const token = sign({}, secret ,{
      subject:user.id,
      expiresIn,
    })

    return (
      {
        user,
        token
      }
    )
  }

}
