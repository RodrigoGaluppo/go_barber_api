import User from "../infra/typeorm/entities/User"
import AppError from "@shared/errors/AppError"
import IUsersInterface from "../repositories/IUsersRepository"
import {injectable,inject} from "tsyringe"
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider"
import IUserTokenRepository from "../repositories/IUsersTokenRepositoy"
import path from "path"

const forgottenTemplatePath = path.resolve(__dirname,"..","views","forgot_password.hbs")


interface Request{
  email:string
}

// servico de reposicao de password

@injectable()
export default class SendForgottenPasswordEmailService{

  constructor( 
    // injecao de dependencias
  @inject("UsersRepository") 
  private usersRepository:IUsersInterface,

  @inject("MailProvider")
  private mailProvider:IMailProvider,

  @inject("UserTokenRepository")
  private userTokenRepository:IUserTokenRepository

  ){}

  public async execute({email}: Request): Promise<void>{
    const user = await this.usersRepository.findByEmail(email)
    if(!user){
      throw new AppError("user does not exist")
    }

    const {token} = await this.userTokenRepository.generate(user.id)

    await this.mailProvider.SendMail({
      to:{
        name:user.name,
        email:user.email
      },
      subject:"[ Go Barber ] Recuperacao de senha",
      templateData:{
        file:forgottenTemplatePath,
        varibales:{
          name:user.name,
          link:`${process.env.APP_WEB_URL}/reset-password?token=${token}`
        }
      }

    })
  }
}
