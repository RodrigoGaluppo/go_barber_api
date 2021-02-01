import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment"
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository"
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO"
import {uuid} from "uuidv4"
import {isEqual,getMonth, getYear, getDate, getDay} from "date-fns"
import IFindAllInMonth from "@modules/appointments/dtos/IFindAllInMonthDTO"
import IFindAllInDay from "@modules/appointments/dtos/IFindAllInDayDTO"

// reposirorio fake usado nos testes
export default class FakeApointmentRepository implements IAppointmentRepository {

    constructor(
      private appointments: Appointment[] = []
    ){}

    public async findByDate(date:Date,provider_id:string):Promise<Appointment | undefined>{
      const findAppointment = this.appointments.find((appointment)=>{
          console.log(this.appointments[0].date);
        
          isEqual(appointment.date,date) && appointment.provider_id === provider_id

      })
      return findAppointment
    }

    public async findAllInMonth({provider_id,year,month}:IFindAllInMonth):Promise<Appointment[]>{

      const appointments = this.appointments.filter((appointment)=>{
          return (
            appointment.provider_id === provider_id && getMonth(appointment.date) + 1 === month &&
            getYear(appointment.date) === year
          )
      })

      return appointments
    }

    public async findAllInDay({provider_id,year,month,day}:IFindAllInDay):Promise<Appointment[]>{

      const appointments = this.appointments.filter((appointment)=>{
          return (
            appointment.provider_id === provider_id && 
            getMonth(appointment.date) + 1 === month &&
            getYear(appointment.date) === year &&
            getDate(appointment.date) === day

          )
      })

      return appointments
    }

    public async create({provider_id,date,user_id}:ICreateAppointmentDTO):Promise<Appointment>{
      const appointment = new Appointment()

      Object.assign(appointment,{ id:uuid(),date,provider_id,user_id })
      this.appointments.push(appointment)

      return appointment
    }
}
