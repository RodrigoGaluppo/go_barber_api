import "reflect-metadata"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository"
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailability"

// teste de criacao de usuario

let fakeUsersRepository : FakeUsersRepository
let listProvidersMonthAvailabilityService:ListProviderMonthAvailabilityService
let fakeAppointmentRepository:FakeAppointmentRepository

describe("List Provider Month availability",()=>{

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        fakeAppointmentRepository = new FakeAppointmentRepository
        listProvidersMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentRepository)
        
    })

    it("should be able to list the monthAvailbility",async ()=>{
       await fakeAppointmentRepository.create({
           provider_id:"user",
           user_id:"user",
           date:new Date(2020,4,20,8,0,0)
       })

       await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,20,9,0,0)
        })

        await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,20,10,0,0)
        })

        await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,20,11,0,0)
        })

        await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,20,12,0,0)
        })

       await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,20,13,0,0)
        })

        await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,20,14,0,0)
        })

        await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,20,15,0,0)
        })

        await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,20,16,0,0)
        })

        await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,20,17,0,0)
        })

        await fakeAppointmentRepository.create({
            provider_id:"user",
            user_id:"user",
            date:new Date(2020,4,21,8,0,0)
        })

        const availability = await listProvidersMonthAvailabilityService.execute({
            provider_id:"user",
            month:5,
            year:2020
        })

        expect(availability)
        .toEqual(expect.arrayContaining([
            {day:19,available:true},  
            {day:20,available:false},
            {day:21,available:true}, 
            {day:22,available:true}
        ]))
    })


})