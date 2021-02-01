import EtherialMailProvider from "./implementations/EtherialMailProvider"
import SESMailProvider from "./implementations/SESMailProvider"
import {container} from "tsyringe"
import IMailProvider from "./models/IMailProvider"
import mailConfig from "@config/mail"

const providers =  {
    etherial:container.resolve(EtherialMailProvider),
    ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
    "MailProvider",
    providers[mailConfig.driver]
)