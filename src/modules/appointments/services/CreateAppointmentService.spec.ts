import "reflect-metadata"
import CreateAppointmentService from "./CreateAppointmentService"
import FakeAppointmentsRepository from "@modules/appointments/repositories/fakes/FakeAppointmentsRepository"
import AppError from "@shared/errors/AppError"
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository"
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider"

let fakeAppointmentsRepository:FakeAppointmentsRepository
let createAppointment:CreateAppointmentService
let fakeNotificationsRepository:FakeNotificationsRepository
let fakeCacheProvider:FakeCacheProvider

describe("CreateAppointment",()=>{

    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        fakeNotificationsRepository = new FakeNotificationsRepository()
        fakeCacheProvider = new FakeCacheProvider()
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,fakeNotificationsRepository,fakeCacheProvider
        )

    })

    it("should be able to create a new appointment",async ()=>{  

        jest.spyOn(Date,"now").mockImplementationOnce(()=>{
            return new Date(2020,4,10,12).getTime()
        })

       const appointment = await createAppointment.execute({
           date: new Date(2020,4,10,13),
           provider_id: "12222",
           user_id:"00000"
       })

       expect(appointment).toHaveProperty("id")
    })

    it("should not be able to create two new appointments at the same time",async ()=>{
        const appointmentDate = new Date(2022,5,10,14)
        
        await createAppointment.execute({
           date: appointmentDate,
           provider_id: "12222",
           user_id:"00001"
        })

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: "111",
                user_id:"11122"
             })
        ).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to schedule an appointment at a passed date",async ()=>{
        const appointmentDate = new Date(2020,4,10,11)
        
        jest.spyOn(Date,"now").mockImplementationOnce(()=>{
            return new Date(2020,4,10,12).getTime()
        })

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: "12222",
                user_id:"00002"
             })
        ).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to schedule an appointment with yourself",async ()=>{
        const appointmentDate = new Date(2020,4,10,11)
        
        jest.spyOn(Date,"now").mockImplementationOnce(()=>{
            return new Date(2020,4,10,13).getTime()
        })

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: "111",
                user_id:"111"
             })
        ).rejects.toBeInstanceOf(AppError)
    })

    
    
})