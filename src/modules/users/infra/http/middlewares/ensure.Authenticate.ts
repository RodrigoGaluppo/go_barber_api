import { Request,Response, NextFunction} from "express"
import { verify } from "jsonwebtoken"
import authConfig from "@config/auth.config"
import AppError from "@shared/errors/AppError"

// middlewares sao funcoes que ficam no meio do cminho da requisicao e sdao sempre chamadas
// usa o json wbetoken para verificar a autenticidade dos usuarios

interface tokenPaylod{
  iat:number,
  exp:number,
  sub:string
}

export default function ensureAuthentication( req:Request, res:Response, next:NextFunction ): void{
    const authHeader = req.headers.authorization

    if(!authHeader){
      throw new AppError("JWT is missing",401)
    }

    const [,token] = authHeader.split(" ")

    try{
      const decoded = verify(token,authConfig.jwt.secret)

      const { sub } = decoded as tokenPaylod
      req.user={
        id:sub
      }

      return next()
    }catch(e){
      console.log(e)
      throw new AppError("Invalid JWT token",401)
    }
}
