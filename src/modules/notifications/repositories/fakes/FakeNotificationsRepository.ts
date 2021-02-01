import { getMongoRepository,MongoRepository} from "typeorm"
import {ObjectID} from "mongodb"
import Notification from "../../infra/typeorm/schemas/Notification"
import INotificationRepository from "@modules/notifications/repositories/INotificationsRepository"
import ICreateDTO from "../../dtos/ICreateNotificationDTO"

export default class NotificationsRepository implements INotificationRepository  {

    private notifications:Notification[] = []

    public async create({content,recipient_id}:ICreateDTO):Promise< Notification>{
      const notification = new Notification()

      Object.assign(notification,{id:new ObjectID(),content,recipient_id})

      this.notifications.push(notification)

      return notification
    }


}
