import "reflect-metadata"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository"
import ListProviderDayAvailabilityService from "./ListProviderDayAvailabilty"

// teste de criacao de usuario

let fakeUsersRepository : FakeUsersRepository
let listProvidersMonthAvailabilityService:ListProviderDayAvailabilityService
let fakeAppointmentRepository:FakeAppointmentRepository

describe("List Provider Month availability",()=>{

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        fakeAppointmentRepository = new FakeAppointmentRepository
        listProvidersMonthAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentRepository)
        
    })

    it("should be able to list the day Availbility",async ()=>{
       await fakeAppointmentRepository.create({
           provider_id:"user",
           date:new Date(2020,4,20,14,0,0),
           user_id:"user"
       })

       await fakeAppointmentRepository.create({
            provider_id:"user",
            date:new Date(2020,4,20,15,0,0),
            user_id:"user"
        })

        jest.spyOn(Date,"now").mockImplementationOnce(()=>{
            return new Date(2020,4,20,11).getTime()
        })

        const availability = await listProvidersMonthAvailabilityService.execute({
            provider_id:"user",
            month:5,
            year:2020,
            day:20
        })

        expect(availability)
        .toEqual(expect.arrayContaining([
            {hour:8,available:false},
            {hour:9,available:false},
            {hour:10,available:false},
            {hour:14,available:false},
            {hour:15,available:false},
            {hour:16,available:true}
        ]))
    })

})