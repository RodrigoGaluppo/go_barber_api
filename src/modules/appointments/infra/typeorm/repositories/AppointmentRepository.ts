import { getRepository,Repository,Raw } from "typeorm"
import Appointment from "../entities/Appointment"
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository"
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO"
import IFindAllInMonth from "@modules/appointments/dtos/IFindAllInMonthDTO"
import IFindAllInDay from "@modules/appointments/dtos/IFindAllInDayDTO"

// repositorios fazem metodos do banco de dados , de acordo com o principio do solid deve se anotar todos 
// os metodos usdos ,mesmo se forem funcoes da propia biblioteca como o caso do typeorm
// assim o sistema nao fica dependente do typeorm

export default class ApointmentRepository implements IAppointmentRepository {

    private ormRepository:Repository<Appointment>

    constructor(){
        this.ormRepository = getRepository(Appointment)
    }

    public async findByDate(date:Date,provider_id:string):Promise<Appointment | undefined>{
      const findAppointment = await this.ormRepository.findOne({
        where:{date,provider_id}
      })
      return findAppointment 
    }

    public async findAllInMonth({provider_id,year,month}:IFindAllInMonth):Promise<Appointment[]>{
      const parsedMonth = String(month).padStart(2,"0")
      const appointments = await this.ormRepository.find({
        where:{
          provider_id,
          date: Raw(dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY' ) = '${parsedMonth}-${year}'`
          )
        }
      })
      return appointments
    }

    public async findAllInDay({provider_id,year,month,day}:IFindAllInDay):Promise<Appointment[]>{
      const parsedDay = String(day).padStart(2,"0")
      const parsedMonth = String(month + 1).padStart(2,"0")
      const appointments = await this.ormRepository.find({
        where:{
          provider_id,
          date: Raw(dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY' ) = '${parsedDay}-${parsedMonth}-${year}'`
          )
        },
        relations:["user"]
      })
      console.log(parsedDay,parsedMonth);
      
      return appointments
    }

    public async create({provider_id,date,user_id}:ICreateAppointmentDTO):Promise<Appointment>{
      const appointment = this.ormRepository.create({provider_id,date,user_id})
      await this.ormRepository.save(appointment);
      return appointment
    }


}
