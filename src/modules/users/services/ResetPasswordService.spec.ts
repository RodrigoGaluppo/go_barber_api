import "reflect-metadata"
import ResetPasswordService from "./ResetPasswordService"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import FakeuserTokenRepository from "../repositories/fakes/FakeUserTokenRepository"
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository"
import FakeHashProvider from "../providers/hashProvider/fakes/FakeHashProvider"

// teste de reposicao de password

let fakeUsersRepository:FakeUsersRepository
let fakeUserTokenRepository:FakeUserTokenRepository
let resetPasswordService:ResetPasswordService
let fakeHashProvider:FakeHashProvider

describe("ResetPasswordService",()=>{

    beforeEach(()=>{
        fakeUsersRepository= new FakeUsersRepository()
        fakeUserTokenRepository = new FakeuserTokenRepository()
        fakeHashProvider = new FakeHashProvider()

        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokenRepository,
            fakeHashProvider
        )
       
    })

    it("should be able to reset a password",async ()=>{
       

       let user = await fakeUsersRepository.create({
           name:"wennedes",
           email:"wennes@gmail.com",
           password:"123456"
       })

       const {token} = await fakeUserTokenRepository.generate(user.id)

       const generateHash = jest.spyOn(fakeHashProvider,"generateHash")

       await resetPasswordService.execute({
           Newpassword:"654321",
           token
       })

       const updatedUser = await fakeUsersRepository.findById(user.id)

       expect(generateHash).toHaveBeenCalledWith("654321")
       expect(updatedUser?.password).toBe("654321")
        
    })

    it("should not be able to reset password with non-existent token", async ()=>{

        await expect(
            resetPasswordService.execute({
                token:"nothing",
                Newpassword:"123"
            })
        ).rejects.toBeInstanceOf(AppError)

    })

    it("should not be able to reset password with non-existent user", async ()=>{

        const {token} = await fakeUserTokenRepository.generate("undefined")
        await expect(
            resetPasswordService.execute({
                token:token,
                Newpassword:"123"
            })
        ).rejects.toBeInstanceOf(AppError)
        
    })

    it("should not be able to reset password 2 hours after creation", async ()=>{

        let user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennes@gmail.com",
            password:"123456"
        })

        const {token} = await fakeUserTokenRepository.generate(user.id)

        jest.spyOn(Date,"now").mockImplementationOnce(()=>{
            const customDate = new Date()

            return customDate.setHours(customDate.getHours() + 3)
        })

        await expect(
            resetPasswordService.execute({
                token:token,
                Newpassword:"123"
            })
        ).rejects.toBeInstanceOf(AppError)
        
    })
})

// RED
// GREEN
// REFACTORY