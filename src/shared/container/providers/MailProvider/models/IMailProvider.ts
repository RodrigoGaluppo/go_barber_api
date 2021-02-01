import ISendMailDTo from "../dtos/ISendMailDTO"

export default interface IMailProvider{
    SendMail(data:ISendMailDTo): Promise<void>
}