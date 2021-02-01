import "reflect-metadata"
import FakeStorageProvider from "@shared/container/providers/storageProvider/fakes/FakeStorageProvider"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import AppError from "@shared/errors/AppError"
import UpdateUserAvatarService from "@modules/users/services/updateUserAvatarService"

// teste de criacao de usuario

let fakeUsersRepository : FakeUsersRepository
let fakeStorage : FakeStorageProvider

describe("UpdateUserAvatar",()=>{

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository()
        fakeStorage = new FakeStorageProvider()
    })

    it("should be able to update an user Avatar",async ()=>{
       const updateAvatar = new UpdateUserAvatarService(
           fakeUsersRepository,
           fakeStorage
       )
        const user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennedes@gmail.com",
            password:"123456"
        })

       const updatedAvatar = await updateAvatar.execute({
           user_id:user.id,
           avatar_fileName:"avatar.jpg"
       })

       expect(updatedAvatar.avatar).toBe("avatar.jpg")
    })

    it("should not be able to update an user Avatar from a non-existent user",async ()=>{
        const updateAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorage
        )  
        await expect(updateAvatar.execute({
            user_id:"non-existent",
            avatar_fileName:"avatar.jpg"
        })).rejects.toBeInstanceOf(AppError)
    })

    it("should delete the current avatar when uploading a new one",async ()=>{
       const deleteFile = jest.spyOn(fakeStorage,"deleteFile")

       const updateAvatar = new UpdateUserAvatarService(
           fakeUsersRepository,
           fakeStorage
       )
        const user = await fakeUsersRepository.create({
            name:"wennedes",
            email:"wennedes@gmail.com",
            password:"123456"
        })

       await updateAvatar.execute({
           user_id:user.id,
           avatar_fileName:"avatar.jpg"
       })

       await updateAvatar.execute({
        user_id:user.id,
        avatar_fileName:"avatar2.jpg"
    })

       expect(deleteFile).toHaveBeenCalledWith("avatar.jpg")
       expect(user.avatar).toBe("avatar2.jpg")
    })

    
})