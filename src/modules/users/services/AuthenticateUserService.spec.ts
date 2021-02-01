import "reflect-metadata"
import AuthenticateUserService from "./AuthenticateService"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import CreateUserService from "./CreateUserService"
import FakeHashProvider from "@modules/users/providers/hashProvider/fakes/FakeHashProvider"
import AppError from "@shared/errors/AppError"

// teste da authenticacao

let hashProvider : FakeHashProvider
let fakeUsersRepository : FakeUsersRepository
let AutehticateUser : AuthenticateUserService
let createUser : CreateUserService

describe("AuthenticateUser",()=>{

   beforeEach(()=>{
       hashProvider = new FakeHashProvider()
       fakeUsersRepository = new FakeUsersRepository()
       AutehticateUser = new AuthenticateUserService(fakeUsersRepository,hashProvider)
       
   })


    it("should be able to Authenticate a user",async ()=>{
       
       const User = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennes@gmail.com",
            password:"123456"
        })

       const response = await AutehticateUser.execute({
        email:"wennes@gmail.com",
        password:"123456"
       })

       expect(response).toHaveProperty("token")
       expect(response.user).toEqual(User)
    })

    it("should not be able to Authenticate with non existing user",async ()=>{

       await expect(AutehticateUser.execute({
        email:"wennes@gmail.com",
        password:"123456"
       })).rejects.toBeInstanceOf(AppError)
    })
    
    it("should not be able to Authenticate a user without a password",async ()=>{

        const User = await fakeUsersRepository.create({
             name:"wennedes",
             email:"wennes@gmail.com",
             password:"123456"
         })
 
         await expect(AutehticateUser.execute({
            email:"wennes@gmail.com",
            password:"wrong-password"
        })).rejects.toBeInstanceOf(AppError)
     })

})