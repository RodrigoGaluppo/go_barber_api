import "reflect-metadata"
import FakeHashProvider from "../providers/hashProvider/fakes/FakeHashProvider"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import UpdateProfileService from "./UpdateProfileService"

// teste de criacao de usuario

let fakeUsersRepository : FakeUsersRepository
let fakeHashProvider : FakeHashProvider
let updateProfileService:UpdateProfileService

describe("UpdateProfile",()=>{

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        updateProfileService = new UpdateProfileService(fakeUsersRepository,fakeHashProvider)
    })

    it("should be able to update an user profile",async ()=>{
        const user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennedes@gmail.com",
            password:"123456"
        })

       const updatedUser = await updateProfileService.execute({
           user_id:user.id,
           name:"wennedes2",
           email:"wennedes2@gmail.com"
       })

       expect(updatedUser.name).toBe("wennedes2")
       expect(updatedUser.email).toBe("wennedes2@gmail.com")
    })

    it("should not be able to update an user profile once its email is already used",async ()=>{
        await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennedes2@gmail.com",
            password:"123456"
        })

        const user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"test@gmail.com",
            password:"123456"
        })


       await expect(updateProfileService.execute({
            user_id:user.id,
            name:"wennedes2",
            email:"wennedes2@gmail.com"
        })).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to update the password",async ()=>{
        const user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennedes@gmail.com",
            password:"123456"
        })

       const updatedUser = await updateProfileService.execute({
           user_id:user.id,
           name:"wennedes2",
           email:"wennedes2@gmail.com",
           old_password:"123456",
           password:"1234"
       })

       expect(updatedUser.password).toBe("1234")
    })

    it("should not be able to update the password without old password ",async ()=>{
        const user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennedes@gmail.com",
            password:"123456"
        })

       expect(updateProfileService.execute({
            user_id:user.id,
            name:"wennedes2",
            email:"wennedes2@gmail.com",
            password:"1234"
        })).rejects.toBeInstanceOf(AppError)
    })
    
    it("should not be able to update the password with a wrong old password ",async ()=>{
        const user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennedes@gmail.com",
            password:"123456"
        })

       expect(updateProfileService.execute({
            user_id:user.id,
            name:"wennedes2",
            email:"wennedes2@gmail.com",
            old_password:"wrong",
            password:"1234"
        })).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to return a user that does not exist",async ()=>{
        expect(updateProfileService.execute({
             user_id:"None",
             name:"test",
             email:"test@example.com"
        })).rejects.toBeInstanceOf(AppError)
     })
})