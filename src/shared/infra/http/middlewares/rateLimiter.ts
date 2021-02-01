import { Request,Response,NextFunction} from "express"
import { RateLimiterRedis } from "rate-limiter-flexible"
import redis from "redis"
import AppError from "@shared/errors/AppError"

const redisClient = redis.createClient({
    host:process.env.REDIS_HOST,
    port:Number(process.env.REDIS_PORT),
    password:process.env.REDIS_PASSWORD || undefined
})

const Limiter = new RateLimiterRedis({
    storeClient:redisClient,
    keyPrefix:"rateLimit",
    points:5,
    duration:1
})

export default async function rateLimiter(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        await Limiter.consume(req.ip)
        return next()
    }catch(e){
        throw new AppError("Too many Requests",429)
    }
}