//import AppointmentRepository from "../repositories/AppointmentRepository"
import {startOfHour,isBefore,getHours,format} from "date-fns"
import Appointment from "../infra/typeorm/entities/Appointment"
import AppError from "@shared/errors/AppError"
import IAppointRepository from "@modules/appointments/repositories/IAppointmentRepository"
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository"
import {injectable,inject } from "tsyringe"
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider"
//

interface IRequest{
  provider_id:string,
  date:Date,
  user_id:string
}

// services fazem a regra de negocios das rotas

@injectable()
export default class CreateAppointmentService{

  constructor(
     @inject("AppointmentsRepository")  
     private appointmentRepository:IAppointRepository,

     @inject("NotificationsRepository")  
     private notificationsrepository:INotificationsRepository,

     @inject("CacheProvider")
    private cacheProvider:ICacheProvider
  ){}



  public async execute({ provider_id,date,user_id }:IRequest): Promise<Appointment>{
    const parsedDate = startOfHour(date)

    if(user_id === provider_id){
      throw new AppError("you are not able to schedule an appointment with yourself")
    }

    if(isBefore(parsedDate,Date.now())){
      throw new AppError("you are not able to schedule an appointment in the past")
    }
    if(getHours(parsedDate) > 17 || getHours(parsedDate) < 8){
      throw new AppError("you are not able to schedule an appointment bafore 8am or after 17pm")
    }

    const findAppointment = await this.appointmentRepository.findByDate(parsedDate,provider_id)

    if(!!findAppointment){
      throw new AppError("this appointment is already booked")
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date:parsedDate,
      user_id
    })

    const formattedDate = format(parsedDate,"dd/MM/yyyy HH:mm")

    await this.notificationsrepository.create({
      recipient_id:provider_id,
      content:`Novo Agendmento para ${formattedDate}`
    })
 
    await this.cacheProvider.invalidate(
      
      `provider-appointments:${provider_id}:${format(parsedDate,"yyyy-M-d")}`
      )

    return appointment
  }
}
