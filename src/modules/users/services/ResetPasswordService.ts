import User from "../infra/typeorm/entities/User"
import AppError from "@shared/errors/AppError"
import IUsersInterface from "../repositories/IUsersRepository"
import {injectable,inject} from "tsyringe"
import IUserTokenRepository from "../repositories/IUsersTokenRepositoy"
import IHashProvider from "../providers/hashProvider/models/IHashProvider"
import { isAfter,addHours } from "date-fns"

interface Request{
  Newpassword:string,
  token:string
}

// servico de reposicao de password

@injectable()
export default class ResetPasswordService{

  constructor( 
    // injecao de dependencias
  @inject("UsersRepository") 
  private usersRepository:IUsersInterface,

  @inject("UserTokenRepository")
  private userTokenRepository:IUserTokenRepository,

  @inject("HashProvider")
  private hashProvider:IHashProvider,

  ){}

  public async execute({Newpassword,token}: Request): Promise<void>{
      const userToken = await this.userTokenRepository.findByToken(token)
      if(!userToken){
          throw new AppError("user token is required")
      }
      const user = await this.usersRepository.findById(userToken.user_id)

      if(!user){
        throw new AppError("user does not exist")
      }

      const tokenCreatedAt = userToken.created_at
      const compareDate = addHours(tokenCreatedAt,2)

      if(isAfter(Date.now(),compareDate)){
          throw new AppError("token expired")
      }

      user.password = await this.hashProvider.generateHash(Newpassword)

      await this.usersRepository.save(user)
  }
}
