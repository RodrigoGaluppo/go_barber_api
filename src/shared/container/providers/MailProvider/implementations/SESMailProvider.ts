import IMailProvider from "../models/IMailProvider"
import nodeMailer,{Transporter} from "nodemailer" 
import aws from "aws-sdk"
import ISendMailDTo from "../dtos/ISendMailDTO"
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider"
import { inject,injectable } from "tsyringe"
import mailConfig from "@config/mail"

@injectable()
export default class SESMailProvider implements IMailProvider {
 
    private client:Transporter

    constructor(
        @inject("MailTemplateProvider")
        private mailTemplateProvider:IMailTemplateProvider
    ){ 

        this.client =  nodeMailer.createTransport({
            SES: new aws.SES({
                apiVersion:"2010-12-01",
                region:"us-east-2",
                accessKeyId:process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
            })
        })
        
    }
    public async SendMail({to,from,subject,templateData}:ISendMailDTo ): Promise<void>{
        const { name,email } = mailConfig.defaults.from
        await this.client.sendMail({
            from: {
                name:from?.name || name,
                address:from?.email || email
            },
            to:{
                name:to.name,
                address:to.email
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        })
    }
}