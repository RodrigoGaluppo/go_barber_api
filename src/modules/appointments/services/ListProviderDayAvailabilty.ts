import {getHours,isAfter, isBefore} from "date-fns"
import AppError from "@shared/errors/AppError"
import IAppointmentsRepository from "../repositories/IAppointmentRepository"
import {injectable,inject} from "tsyringe"
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider"

// servico de update do avatar

interface Request{
  provider_id:string
  month:number
  year:number,
  day:number
}

type IResponse = {
    hour:number,
    available:boolean
}[]

@injectable()
export default class ListProvidersDayAvailabilityService{

  constructor( 
    @inject("AppointmentsRepository")
    private appointmentsRepository:IAppointmentsRepository
  ){}

  public async execute({ provider_id,month,year,day }:Request): Promise<IResponse>{
    const appointments = await this.appointmentsRepository.findAllInDay({
      provider_id,
      month,
      year,
      day
    })
    
    
    const hourStart = 8

    const eachHourArray = Array.from(
      {length:10},
      (_,index)=>{
       return index + hourStart
      }
    )
    
    const currentDate = new Date(Date.now())

    const availability = eachHourArray.map(hour =>{
      
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) == hour
      )
      
      const compareDate = new Date(year,month-1,day,hour)
      console.log(compareDate);
      
      return{
        hour,
        available:(!hasAppointmentInHour && isAfter(currentDate,compareDate))
      }
    })

    return availability
  }
}
