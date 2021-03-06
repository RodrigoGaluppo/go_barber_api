import {uuid} from "uuidv4"
import User from "../../infra/typeorm/entities/User"
import IUserRepository from "@modules/users/repositories/IUsersRepository"
import ICreateUserDTO from "@modules/users/dtos/ICreateUser"
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO"

// repositorio fake de usuarios 

export default class FakeUsersRepository implements IUserRepository {
    private users: User[] = []
    public async findById(id:string) : Promise<User | undefined>{
        const Finduser = this.users.find(user => user.id == id)
        return Finduser
    }

    public async findByEmail(email:string) : Promise<User | undefined>{
        const Finduser = this.users.find(user => user.email == email)
        return Finduser
    }

    public async create(userData:ICreateUserDTO):Promise<User>{
      const user = new User()
      Object.assign(user,{id:uuid()},userData)
      this.users.push(user)
      return user
    }

    public async save(user:User):Promise<User>{
        const FindIndex = this.users.findIndex(finduser => user.id == finduser.id)
        this.users[FindIndex] = user
        return user
    }

    public async FindAllProviders({except_user_id}:IFindAllProvidersDTO):Promise<User[]>{
        let users = this.users

        if(except_user_id){
            users = this.users.filter(user=>user.id !== except_user_id)
        }

        return users
    }
}
