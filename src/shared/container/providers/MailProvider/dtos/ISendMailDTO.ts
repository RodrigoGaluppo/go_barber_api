import IParseMailTemplateDTo from "@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO"

interface IMailContact{
    name:string,
    email:string
}

export default interface ISendMailDTo{
    to:IMailContact,
    from?:IMailContact,
    subject:string,
    templateData:IParseMailTemplateDTo
}