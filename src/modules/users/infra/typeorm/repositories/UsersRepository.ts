import { getRepository,Repository ,Not} from "typeorm"
import User from "../entities/User"
import IUserRepository from "@modules/users/repositories/IUsersRepository"
import ICreateUserDTO from "@modules/users/dtos/ICreateUser"
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO"
// repositorios guardam os metodos usados nos banco de dados

export default class UsersRepository implements IUserRepository {

    private ormRepository:Repository<User>

    constructor(){
        this.ormRepository = getRepository(User)
    }

    public async findById(id:string) : Promise<User | undefined>{
        const user = await this.ormRepository.findOne(id)
        return user
    }

    public async findByEmail(email:string) : Promise<User | undefined>{
        const user = await this.ormRepository.findOne({
            where:{email}
        })
        return user
    }

    public async create(userData:ICreateUserDTO):Promise<User>{
      const user = this.ormRepository.create(userData)
      await this.ormRepository.save(user);
      return user
    }

    public async save(user:User):Promise<User>{
        return this.ormRepository.save(user)
    }

    public async FindAllProviders({except_user_id}:IFindAllProvidersDTO):Promise<User[]>{

        let users = []

        if(except_user_id){
            users = await this.ormRepository.find({
                where:{
                    id: Not(except_user_id)
                }
            })
        }else{
            users = await this.ormRepository.find()
        }

        return users
    }
}
