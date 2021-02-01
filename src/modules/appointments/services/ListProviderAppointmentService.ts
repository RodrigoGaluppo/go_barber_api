import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider"
import IAppointmentsRepository from "../repositories/IAppointmentRepository"
import {injectable,inject} from "tsyringe"
import Appointment from "../infra/typeorm/entities/Appointment"
import { classToClass } from "class-transformer"
// servico de update do avatar

interface Request{
  provider_id:string
  month:number
  year:number,
  day:number
}



@injectable()
export default class ListProvidersMonthAvailabilityService{

  constructor( 
    @inject("AppointmentsRepository")
    private appointmentsRepository:IAppointmentsRepository,

    @inject("CacheProvider")
    private cacheProvider:ICacheProvider
  ){}

  public async execute({ provider_id,month,year,day }:Request): Promise<Appointment[]>{

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      `provider-appointments:${provider_id}:${year}-${month}-${day}`
    )

    if(!appointments){
      appointments = await this.appointmentsRepository.findAllInDay({
        provider_id,month,year,day
      })
  
      await this.cacheProvider.save(
        `provider-appointments:${provider_id}:${year}-${month}-${day}`,
        classToClass( appointments)
      )
    }

    return appointments
  }
}
