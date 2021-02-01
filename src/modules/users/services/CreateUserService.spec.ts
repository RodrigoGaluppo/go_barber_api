import "reflect-metadata"
import CreateUserService from "./CreateUserService"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import FakeHashProvider from "@modules/users/providers/hashProvider/fakes/FakeHashProvider"
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider"

// teste de criacao de usuario

let fakeUsersRepository : FakeUsersRepository
let hashProvider : FakeHashProvider
let createAppointment : CreateUserService
let fakeCacheProvider : FakeCacheProvider

describe("CreateUser",()=>{
    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        hashProvider = new FakeHashProvider()
        fakeCacheProvider = new FakeCacheProvider()
        createAppointment = new CreateUserService(fakeUsersRepository,hashProvider,fakeCacheProvider)
    })
    it("should be able to create a new user",async ()=>{
        
       const appointment = await createAppointment.execute({
           name:"wennedes",
           email:"wennes@gmail.com",
           password:"123456"
       })

       expect(appointment).toHaveProperty("id")
    })

    it("should be able to not create a new user if its email is already used",async ()=>{

        const appointment = await createAppointment.execute({
            name:"wennedes",
            email:"wennes@gmail.com",
            password:"123456"
        })
 
        await expect(createAppointment.execute({
            name:"wennedes",
            email:"wennes@gmail.com",
            password:"123456"
        })).rejects.toBeInstanceOf(AppError)
     })
    
})