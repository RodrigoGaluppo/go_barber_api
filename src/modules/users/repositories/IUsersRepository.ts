import User from "../infra/typeorm/entities/User"
import ICreateUserDTO from "@modules/users/dtos/ICreateUser"
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO"

// interface do repositorio de usuarios

export default interface IUsersInterface{
    findById(id:string):Promise<User|undefined>
    findByEmail(email:string):Promise<User|undefined>
    create(data:ICreateUserDTO):Promise<User>
    save(user:User):Promise<User>
    FindAllProviders(data:IFindAllProvidersDTO):Promise<User[]>
}