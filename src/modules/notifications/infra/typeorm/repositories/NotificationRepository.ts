import { getMongoRepository,MongoRepository} from "typeorm"
import Notification from "../schemas/Notification"
import INotificationRepository from "@modules/notifications/repositories/INotificationsRepository"
import ICreateDTO from "../../../dtos/ICreateNotificationDTO"


// repositorios fazem metodos do banco de ddos , de acordo com o principio do solid deve se anotar todos 
// os metodos usdos ,mesmo se forem funcoes da propia biblioteca como o caso do typeorm
// assim o sistema nao fica dependente do typeorm

export default class NotificationsRepository implements INotificationRepository  {

    private ormRepository:MongoRepository<Notification>

    constructor(){
        this.ormRepository = getMongoRepository(Notification,"mongo")
    }
    public async create({content,recipient_id}:ICreateDTO):Promise< Notification>{
      const notification = this.ormRepository.create({content,recipient_id})
      await this.ormRepository.save(notification);
      return notification
    }


}
