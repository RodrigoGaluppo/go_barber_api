import IMailProvider from "../models/IMailProvider"
import nodeMailer,{ Transporter } from "nodemailer" 
import ISendMailDTo from "../dtos/ISendMailDTO"
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider"
import { inject,injectable } from "tsyringe"

@injectable()
export default class EtherialMailProvider implements IMailProvider {
    private client: Transporter
    constructor(
        @inject("MailTemplateProvider")
        private mailTemplateProvider:IMailTemplateProvider
    ){ 

        nodeMailer.createTestAccount().then(testAccount=>{
            let transporter = nodeMailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: testAccount.user, // generated ethereal user
                  pass: testAccount.pass, // generated ethereal password
                },
            })
            this.client = transporter
        })
        
    }
    public async SendMail({to,from,subject,templateData}:ISendMailDTo ): Promise<void>{
        const message = await this.client.sendMail({
            from: {
                name:from?.name || "equipe Go barber",
                address:from?.email || "equipeGobarber@gobarber.com"
            },
            to:{
                name:to.name,
                address:to.email
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        })
        
        console.log("Message sent %s",message.messageId);
        console.log("Preview URL : %s",nodeMailer.getTestMessageUrl(message));
        
    }
}