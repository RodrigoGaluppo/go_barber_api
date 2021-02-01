import "reflect-metadata"
import SendForgottenPasswordEmailService from "./SendForgottenPasswordEmailService"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeProvider.spec"
import FakeuserTokenRepository from "../repositories/fakes/FakeUserTokenRepository"
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository"

// teste de reposicao de password

let fakeUsersRepository:FakeUsersRepository
let fakeMailProvider:FakeMailProvider
let fakeUserTokenRepository:FakeUserTokenRepository
let sendForgottenPasswordEmail:SendForgottenPasswordEmailService

describe("SendForgottenPasswordEmail",()=>{

    beforeEach(()=>{
        fakeUsersRepository= new FakeUsersRepository()
        fakeUserTokenRepository = new FakeuserTokenRepository()
        fakeMailProvider = new FakeMailProvider()
        sendForgottenPasswordEmail = new SendForgottenPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokenRepository
        )
       
    })

    it("should be able to recover the password of the usar by email",async ()=>{
       const sendMail = jest.spyOn(fakeMailProvider,"SendMail")

       await fakeUsersRepository.create({
           name:"wennedes",
           email:"wennes@gmail.com",
           password:"123456"
       })

       await sendForgottenPasswordEmail.execute({
           email:"wennes@gmail.com",
       })

        expect(sendMail).toHaveBeenCalled()
    })

    it("should not be able to recover the password of a non-existent user",async ()=>{

        await expect(sendForgottenPasswordEmail.execute({
            email:"wennes@gmail.com",
        })).rejects.toBeInstanceOf(AppError)

     })
    
     it("should generate a token", async ()=>{
        const generateToken = jest.spyOn(fakeUserTokenRepository,"generate")
        
        const user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennes@gmail.com",
            password:"123456"
        })
 
        await sendForgottenPasswordEmail.execute({
            email:"wennes@gmail.com",
        })

        expect(generateToken).toHaveBeenCalledWith(user.id)
     })
})

// RED
// GREEN
// REFACTORY