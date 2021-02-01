import "reflect-metadata"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import ListProvidersService from "./ListProvidersService"
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider"

// teste de criacao de usuario

let fakeUsersRepository : FakeUsersRepository
let listProvidersService:ListProvidersService
let fakeCacheProvider:FakeCacheProvider

describe("UpdateProfile",()=>{

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        fakeCacheProvider = new FakeCacheProvider()
        listProvidersService = new ListProvidersService(fakeUsersRepository,fakeCacheProvider)
    })

    it("should be able to return a user",async ()=>{
        const loggeduser = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennedes@gmail.com",
            password:"123456"
        })

        const user1 = await fakeUsersRepository.create({
            name:"wennedes1",
            email:"wennedes1@gmail.com",
            password:"123456"
        })

        const user2 = await fakeUsersRepository.create({
            name:"wennedes2",
            email:"wennedes2@gmail.com",
            password:"123456"
        })

        const user3 = await fakeUsersRepository.create({
            name:"wennedes3",
            email:"wennedes3@gmail.com",
            password:"123456"
        })

       const providers = await listProvidersService.execute({
           user_id:loggeduser.id,
       })

       expect(providers).toStrictEqual([
        user1,user2,user3
       ])
    })


})