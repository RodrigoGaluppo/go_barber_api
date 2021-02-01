import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO"
import Appointment from "../infra/typeorm/entities/Appointment"
import IFindAllInMonth from "@modules/appointments/dtos/IFindAllInMonthDTO"
import IFindAllInDay from "@modules/appointments/dtos/IFindAllInDayDTO"
// interface que guarda os metodos usados
export default interface IAppointmentsRepository{
    findByDate(date:Date,provider_id:string): Promise<Appointment | undefined>
    create(data:ICreateAppointmentDTO): Promise<Appointment>
    findAllInMonth(data:IFindAllInMonth): Promise<Appointment[]>
    findAllInDay(data:IFindAllInDay): Promise<Appointment[]>
}