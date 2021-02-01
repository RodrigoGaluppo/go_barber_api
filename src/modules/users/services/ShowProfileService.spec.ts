import "reflect-metadata"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import ShowProfileService from "./ShowProfileService"

// teste de criacao de usuario

let fakeUsersRepository : FakeUsersRepository
let showProfileService:ShowProfileService

describe("UpdateProfile",()=>{

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        showProfileService = new ShowProfileService(fakeUsersRepository)
    })

    it("should be able to return a user",async ()=>{
        const user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennedes@gmail.com",
            password:"123456"
        })

       const profile = await showProfileService.execute({
           user_id:user.id,
       })

       expect(profile.name).toBe("wennedes")
    })

    it("should not be able to return a user that does not exist",async ()=>{
       expect(showProfileService.execute({
            user_id:"None",
        })).rejects.toBeInstanceOf(AppError)
    })

})