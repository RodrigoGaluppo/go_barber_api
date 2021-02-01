import IMailTemplateProvider from "../models/IMailTemplateProvider"
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO"


export default class FakeMailTemplateProvider implements IMailTemplateProvider{
    public async parse({ file,varibales }:IParseMailTemplateDTO):Promise <string>{
        return "Mail content"
    }
}