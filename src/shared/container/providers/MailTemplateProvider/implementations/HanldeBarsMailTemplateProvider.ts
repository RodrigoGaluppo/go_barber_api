import IMailTemplateProvider from "../models/IMailTemplateProvider"
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO"
import handlebars from "handlebars"
import fs from "fs"

export default class HandleMailTemplateProvider implements IMailTemplateProvider{
    public async parse({ file,varibales }:IParseMailTemplateDTO):Promise <string>{

        const template = await fs.promises.readFile(file,{encoding:"utf-8"})

        const parseTemplate = handlebars.compile(template)

        return parseTemplate(varibales)
    }
}