import "reflect-metadata"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository"
import ListProviderAppointmentService from "./ListProviderAppointmentService"
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider"

// teste de criacao de usuario

let fakecacheProvider:FakeCacheProvider
let listProvidersAppointmentsService:ListProviderAppointmentService
let fakeAppointmentRepository:FakeAppointmentRepository

describe("List Provider Appointments",()=>{

    beforeEach(()=>{
        fakecacheProvider = new FakeCacheProvider()
        fakeAppointmentRepository = new FakeAppointmentRepository
        listProvidersAppointmentsService = new ListProviderAppointmentService(fakeAppointmentRepository,fakecacheProvider)
        
    })

    it("should be able to list the Appointments in a specific day",async ()=>{
       const appointment1 = await fakeAppointmentRepository.create({
           provider_id:"provider",
           user_id:"user",
           date:new Date(2020,4,20,15,0,0)
       })

       const appointment2 = await fakeAppointmentRepository.create({
            provider_id:"provider",
            user_id:"user",
            date:new Date(2020,4,20,14,0,0)
        })

       const appointments = await listProvidersAppointmentsService.execute({
           provider_id:"provider",
           day:20,
           month:5,
           year:2020
       })
       
       expect(appointments).toEqual([appointment1,appointment2])

    })


})