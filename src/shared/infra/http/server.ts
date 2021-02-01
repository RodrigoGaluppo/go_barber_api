import "reflect-metadata"
import "dotenv/config"

import express, { NextFunction ,Request,Response} from 'express';
import {errors} from "celebrate"
import "express-async-errors"
import routes from "./routes"
import "@shared/container"
import "@shared/infra/typeorm"
import rateLimiter from "../../infra/http/middlewares/rateLimiter"

import uploadConfig from "@config/upload.config"
import AppError from "@shared/errors/AppError"
import cors from "cors"

const app = express();


app.use(cors())
app.use(express.json());
app.use("/files",express.static(uploadConfig.tmpFolder))
app.use(rateLimiter)
app.use(routes)
app.use(errors())

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      status:"Error",
      message:err.message
    })
  }
  return res.status(500).json({
    status:"Error",
    message:"internal error"
  })
})

app.listen(3333,()=>{
    console.log("working");
});

// parte principal da aplicacao onde carrega tudo 