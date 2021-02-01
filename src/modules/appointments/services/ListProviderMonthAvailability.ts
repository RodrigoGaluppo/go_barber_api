import {getDaysInMonth,getDate,isAfter} from "date-fns"
import AppError from "@shared/errors/AppError"
import IAppointmentsRepository from "../repositories/IAppointmentRepository"
import {injectable,inject} from "tsyringe"

// servico de update do avatar

interface Request{
  provider_id:string
  month:number
  year:number
}

type IResponse = Array<{
    day:number,
    available:boolean
}>

@injectable()
export default class ListProvidersMonthAvailabilityService{

  constructor( 
    @inject("AppointmentsRepository")
    private appointmentsRepository:IAppointmentsRepository
  ){}

  public async execute({ provider_id,month,year }:Request): Promise<IResponse>{
    
    const appointments = await this.appointmentsRepository.findAllInMonth({
      provider_id:provider_id,
      year,
      month
    })
  
    console.log(appointments);
    
    const numberOfDaysInMOnth = getDaysInMonth(
      new Date(year,month - 1)
    )

    const eachDayArray = Array.from(
      {length:numberOfDaysInMOnth},
      (value,index)=> index + 1,
    )

    const availability = eachDayArray.map(day=>{

      const compareDate = new Date(year,month - 1,day,23,59,59)

      const appointmentsInday = appointments.filter(appointment=>{
        return getDate(appointment.date) === day
      })



      return {
        day,
        available: isAfter(compareDate,new Date()) && appointmentsInday.length < 10
      }
    })

    return availability
  }
}
