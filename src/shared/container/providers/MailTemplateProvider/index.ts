
import HandlebarMailTemplateProvider from "./implementations/HanldeBarsMailTemplateProvider"
import {container} from "tsyringe"
import IMailTemplateProvider from "./models/IMailTemplateProvider"
import mailConfig from "@config/mail"

const providers =  {
    handlebars:container.resolve(HandlebarMailTemplateProvider),
}

container.registerSingleton<IMailTemplateProvider>(
    "MailTemplateProvider",
    HandlebarMailTemplateProvider
)